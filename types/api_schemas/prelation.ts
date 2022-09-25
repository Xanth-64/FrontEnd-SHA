import topic from './topic';

type prelation = {
  id?: string;
  created_at?: string;
  knowledge_weight: number;
  successor?: topic;
  predecessor?: topic;
};
export default prelation;
