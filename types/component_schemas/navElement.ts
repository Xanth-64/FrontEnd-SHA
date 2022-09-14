import { ReactNode } from 'react';
type navElement = {
  link: string;
  icon: ReactNode;
  title: string;
  color: string;
  topic_id?: string;
};

export default navElement;
