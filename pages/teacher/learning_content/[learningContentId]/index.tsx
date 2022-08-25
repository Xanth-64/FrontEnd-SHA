import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UpdateLearningContentCard from '../../../../components/molecules/UpdateLearningContentCard';
import PageInteractionsCard from '../../../../components/organisms/PageInteractionsCard';
import PageRulesCard from '../../../../components/organisms/PageRulesCard';
import TopNavigation from '../../../../components/organisms/TopNavigation';
import NonSSRWrapper from '../../../../components/overlays/NonSSRWrapper';
import CardHolder from '../../../../components/templates/CardHolder';
import axiosInstance from '../../../../lib/constants/axiosInstance';
import teacherPageTabList from '../../../../lib/constants/tabLists/teacherPageTabList';
import ShowFailedNotification from '../../../../lib/utils/ShowFailedNotification';
import learningContent from '../../../../types/api_schemas/learningContent';
const PageDisplay: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>(
    teacherPageTabList[0].value
  );
  const [currentLearningContent, setCurrentLearningContent] = useState<
    learningContent | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { learningContentId } = router.query;
  const fetchLearningContent = () => {
    const inner_function = async () => {
      if (learningContentId) {
        setLoading(true);
        try {
          const response = await axiosInstance.get(
            `/learning_content/${learningContentId}`
          );
          setCurrentLearningContent(response.data.data);
        } catch (error: any) {
          ShowFailedNotification(
            'Error al cargar el contenido de aprendizaje',
            'Error obteniendo la información del contenido de aprendizaje. Intente nuevamente.'
          );
        }
        setLoading(false);
      }
    };
    inner_function();
  };
  useEffect(fetchLearningContent, [learningContentId]);
  return (
    <CardHolder>
      <TopNavigation
        links={teacherPageTabList}
        getActiveTab={currentTab}
        setActiveTab={setCurrentTab}
      >
        {currentTab === 'editcontent' ? (
          <NonSSRWrapper>
            <UpdateLearningContentCard
              currentLearningContent={currentLearningContent}
              loading={loading}
              fetchLearningContent={fetchLearningContent}
            />
          </NonSSRWrapper>
        ) : null}
        {currentTab === 'configureadaptation' ? (
          <>
            <NonSSRWrapper>
              <PageInteractionsCard
                currentLearningContent={currentLearningContent}
                loading={loading}
                fetchLearningContent={fetchLearningContent}
              />
              <PageRulesCard
                currentLearningContent={currentLearningContent}
                loading={loading}
                fetchLearningContent={fetchLearningContent}
              />
            </NonSSRWrapper>
          </>
        ) : null}
      </TopNavigation>
    </CardHolder>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'teacher',
    },
  };
}

export default PageDisplay;
