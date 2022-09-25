import { AppShell } from '@mantine/core';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

import useUser from '../../lib/hooks/useUser';

import AppFooter from '../molecules/AppFooter';
import AppHeader from '../molecules/AppHeader';

type Props = {
  children: ReactNode;
};
const CustomAppshell = ({ children }: Props) => {
  const { user, isLoading, isError } = useUser();
  const AppNavbar = dynamic(() => import('../molecules/AppNavbar'), {
    ssr: false,
  });
  return (
    <AppShell
      header={<AppHeader />}
      footer={<AppFooter />}
      navbar={user || isLoading ? <AppNavbar /> : undefined}
      style={{ height: '100%' }}
      zIndex={100}
      styles={(theme) => {
        return {
          main: {
            height: '100%',
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        };
      }}
    >
      {children}
    </AppShell>
  );
};

export default CustomAppshell;
