import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UpdateLearningContentCard from '../../../../components/molecules/UpdateLearningContentCard';
import CreateAdaptativeEventCard from '../../../../components/organisms/CreateAdaptativeEventCard';
import PageInteractionsCard from '../../../../components/organisms/PageInteractionsCard';
import TopNavigation from '../../../../components/organisms/TopNavigation';
import CustomLoadingOverlay from '../../../../components/overlays/CustomLoadingOverlay';
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
      <CustomLoadingOverlay visible={loading} />
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
              <CreateAdaptativeEventCard
                adaptative_object_id={
                  currentLearningContent?.page?.adaptative_object_id
                }
                supported_adaptative_events={[
                  'HIGHLIGHT',
                  'OBSCURE',
                  'DISABLE',
                  'HIDE',
                  'NOTIFY_POSITIVE',
                  'NOTIFY_NEGATIVE',
                ]}
                supported_adaptative_variables={[
                  'TOPIC_KNOWLEDGE',
                  'TEMPLATE_KNOWLEDGE',
                  'LEARNING_STYLE_AURAL_AFFINITY',
                  'LEARNING_STYLE_VISUAL_AFFINITY',
                  'LEARNING_STYLE_READING_AFFINITY',
                  'LEARNING_STYLE_KINESTHETIC_AFFINITY',
                ]}
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
