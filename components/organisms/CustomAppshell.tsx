import { AppShell } from '@mantine/core';
import AppHeader from '../molecules/AppHeader';
import AppFooter from '../molecules/AppFooter';
import dynamic from 'next/dynamic';

import { ReactNode } from 'react';
import useUser from '../../lib/hooks/useUser';

type Props = {
  children: ReactNode;
};
const CustomAppshell = ({ children }: Props) => {
  const { user } = useUser();
  const AppNavbar = dynamic(() => import('../molecules/AppNavbar'), {
    ssr: false,
  });
  return (
    <AppShell
      header={<AppHeader />}
      footer={<AppFooter />}
      navbar={user ? <AppNavbar /> : undefined}
      style={{ height: '100%' }}
      // fixed
      zIndex={100}
      styles={(theme) => {
        return {
          // body: {
          //   height: '100%',
          // },
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
