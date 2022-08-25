import learningContent from '../api_schemas/learningContent';

type pageInteractionsCardProps = {
  currentLearningContent?: learningContent;
  loading: boolean;
  fetchLearningContent: () => void;
};

export default pageInteractionsCardProps;
