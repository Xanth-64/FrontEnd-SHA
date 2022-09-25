import type { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useUser from '../../../lib/hooks/useUser';

import CustomLoadingOverlay from '../../../components/overlays/CustomLoadingOverlay';

import VarkTestForm from '../../../components/organisms/VarkTestForm';

const VarkTest: NextPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading) {
      if (user?.user.vark_completed) {
        router.push(`/${user?.role[0].role_name}`);
      }
    }
  }, [user, isLoading]);
  return (
    <>
      <CustomLoadingOverlay visible={isLoading} />
      <VarkTestForm />
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

export default VarkTest;
