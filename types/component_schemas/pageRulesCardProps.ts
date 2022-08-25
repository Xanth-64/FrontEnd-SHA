import learningContent from '../api_schemas/learningContent';

type pageRulesCardProps = {
  currentLearningContent?: learningContent;
  loading: boolean;
  fetchLearningContent: () => void;
};

export default pageRulesCardProps;
