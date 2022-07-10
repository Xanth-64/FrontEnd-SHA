import { AppShell } from '@mantine/core';
import AppHeader from '../molecules/AppHeader';
import AppFooter from '../molecules/AppFooter';
import dynamic from 'next/dynamic';

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
const CustomAppshell = ({ children }: Props) => {
  const AppNavbar = dynamic(() => import('../molecules/AppNavbar'), {
    ssr: false,
  });
  return (
    <AppShell
      header={<AppHeader />}
      footer={<AppFooter />}
      navbar={<AppNavbar />}
      style={{ height: '100%' }}
      fixed
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
