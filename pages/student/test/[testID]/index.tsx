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
import TestProps from '../../../../types/page_schemas/TestProps';

const Test = ({
  currentPracticeTest,
  currentPracticeTestAttempt,
}: TestProps) => {
  return (
    <>
      {currentPracticeTestAttempt ? (
        <StudentPracticeTestAttemptDisplay
          testAttempt={currentPracticeTestAttempt}
        />
      ) : null}
      {currentPracticeTest && !currentPracticeTestAttempt ? (
        <StudentPracticeTestForm practiceTest={currentPracticeTest} />
      ) : null}
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const testID = context.params?.testID;
  let currentPracticeTestAttempt: testAttempt | null = null;
  let currentPracticeTest: practiceTest | null = null;
  try {
    const { data } = await axiosInstance.get(
      `/practice_tests/student/${testID}`,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies.idToken}`,
        },
      }
    );
    currentPracticeTest = data.data;
  } catch (error: any) {
    console.error(error);
  }
  try {
    const { data } = await axiosInstance.get('/test_attempt/by_test_id/', {
      params: {
        practice_test_id: testID,
      },
      headers: {
        Authorization: `Bearer ${context.req.cookies.idToken}`,
      },
    });
    if (data?.data?.practice_test) {
      currentPracticeTestAttempt = data.data;
    }
  } catch (error: any) {
    console.error(error);
  }
  return {
    props: {
      protected: true,
      expected_role: 'student',
      currentPracticeTestAttempt,
      currentPracticeTest,
    },
  };
}

export default Test;
