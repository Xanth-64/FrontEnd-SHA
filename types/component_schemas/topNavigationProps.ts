import { ReactNode } from 'react';
import topNavigationTab from './topNavigationTab';

type topNavigationProps = {
  links: topNavigationTab[];
  getActiveTab: string;
  setActiveTab: (value: string) => void;
  children: ReactNode;
};

export default topNavigationProps;
