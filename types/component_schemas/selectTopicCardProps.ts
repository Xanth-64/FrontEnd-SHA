import { ReactNode } from 'react';

type selectTopicCardProps = {
  children: ReactNode;
  getActiveTopic: string;
  setActiveTopic: (value: string) => void;
};

export default selectTopicCardProps;
