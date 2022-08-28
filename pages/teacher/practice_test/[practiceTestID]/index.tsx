import { Stack } from '@mantine/core';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CreatePracticeTestCard from '../../../../components/molecules/CreatePracticeTestCard';
import TopNavigation from '../../../../components/organisms/TopNavigation';
import CustomLoadingOverlay from '../../../../components/overlays/CustomLoadingOverlay';
import NonSSRWrapper from '../../../../components/overlays/NonSSRWrapper';
import CardHolder from '../../../../components/templates/CardHolder';
import axiosInstance from '../../../../lib/constants/axiosInstance';
import teacherPracticeTestTabList from '../../../../lib/constants/tabLists/teacherPracticeTestTabList';
import ShowFailedNotification from '../../../../lib/utils/ShowFailedNotification';
import practiceTest from '../../../../types/api_schemas/practiceTest';

const PracticeTestDisplay: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>('edittest');
  const [currentPracticeTest, setCurrentPracticeTest] = useState<
    practiceTest | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { practiceTestID } = router.query;
  useEffect(() => {
    const inner_function = async () => {
      if (practiceTestID) {
        setLoading(true);
        try {
          const response = await axiosInstance.get(
            `/practice_tests/teacher/${practiceTestID}`
          );
          setCurrentPracticeTest(response.data.data);
        } catch (error: any) {
          ShowFailedNotification(
            'Error al cargar la prueba',
            'Error obteniendo la información de la prueba. Intente nuevamente.'
          );
        }
        setLoading(false);
      }
    };
    inner_function();
  }, [practiceTestID]);
  return (
    <CardHolder>
      <CustomLoadingOverlay visible={loading} />
      <TopNavigation
        links={teacherPracticeTestTabList}
        getActiveTab={currentTab}
        setActiveTab={setCurrentTab}
      >
        {currentTab === 'edittest' ? (
          <NonSSRWrapper>
            <Stack>
              <CreatePracticeTestCard
                displayContent={true}
                currentPracticeTest={currentPracticeTest}
              />
            </Stack>
          </NonSSRWrapper>
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

export default PracticeTestDisplay;
