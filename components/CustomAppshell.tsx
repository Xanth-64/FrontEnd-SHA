import { AppShell } from '@mantine/core';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AppNavbar from './AppNavbar';

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
const CustomAppshell = ({ children }: Props) => {
  return (
    <AppShell
      header={<AppHeader />}
      footer={<AppFooter />}
      navbar={<AppNavbar />}
    >
      <h1>Hello There</h1>
      {children}
    </AppShell>
  );
};

export default CustomAppshell;
