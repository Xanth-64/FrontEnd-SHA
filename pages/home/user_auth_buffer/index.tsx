import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useUser from '../../../lib/hooks/useUser';

import CustomLoadingOverlay from '../../../components/overlays/CustomLoadingOverlay';

const UserAuthBuffer: NextPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push(`${user?.role[0].role_name}`);
        return;
      }
      router.push('home');
    }
  }, [user, isLoading]);
  return <CustomLoadingOverlay visible={true} />;
};

export default UserAuthBuffer;
