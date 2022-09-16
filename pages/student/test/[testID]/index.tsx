import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StudentPracticeTestAttemptDisplay from '../../../../components/organisms/StudentPracticeTestAttemptDisplay';
import StudentPracticeTestForm from '../../../../components/organisms/StudentPracticeTestForm';
import CustomLoadingOverlay from '../../../../components/overlays/CustomLoadingOverlay';
import NonSSRWrapper from '../../../../components/overlays/NonSSRWrapper';
import axiosInstance from '../../../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../../../lib/utils/ShowFailedNotification';
import practiceTest from '../../../../types/api_schemas/practiceTest';
import testAttempt from '../../../../types/api_schemas/testAttempt';

const Test: NextPage = () => {
  const router = useRouter();
  const { testID } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPracticeTestAttempt, setCurrentPracticeTestAttempt] =
    useState<testAttempt>();
  const [currentPracticeTest, setCurrentPracticeTest] =
    useState<practiceTest>();
  const fetchTestData = () => {
    const inner_function = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `/practice_tests/student/${testID}`
        );
        setCurrentPracticeTest(data.data);
      } catch (error: any) {
        ShowFailedNotification(
          'Error recuperando la información de la prueba.',
          'Ocurrió un error inesperado recuperando la información de la prueba. Por favor, intente nuevamente.'
        );
        router.push('/student/');
      }
      try {
        const { data } = await axiosInstance.get('/test_attempt/by_test_id/', {
          params: {
            practice_test_id: testID,
          },
        });
        if (data?.data?.practice_test) {
          setCurrentPracticeTestAttempt(data.data);
        }
      } catch (error: any) {
        ShowFailedNotification(
          'Error recuperando el intento de prueba realizado.',
          'Ocurrió un error inesperado recuperando el intento de prueba realizado. Por favor, intente nuevamente.'
        );
        router.push('/student/');
      }
      setLoading(false);
    };
    inner_function();
  };
  useEffect(fetchTestData, [testID]);
  return (
    <>
      <CustomLoadingOverlay visible={loading} />
      {!loading ? (
        <NonSSRWrapper>
          {currentPracticeTestAttempt ? (
            <StudentPracticeTestAttemptDisplay
              testAttempt={currentPracticeTestAttempt}
            />
          ) : null}
          {currentPracticeTest && !currentPracticeTestAttempt ? (
            <StudentPracticeTestForm practiceTest={currentPracticeTest} />
          ) : null}
        </NonSSRWrapper>
      ) : null}
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'student',
    },
  };
}

export default Test;
