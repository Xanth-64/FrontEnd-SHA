import learningContent from '../api_schemas/learningContent';

type updateLearningContentCardProps = {
  currentLearningContent?: learningContent;
  loading: boolean;
  fetchLearningContent: () => void;
};

export default updateLearningContentCardProps;
