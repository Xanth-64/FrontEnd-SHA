import template from '../api_schemas/template';

type createLearningContentCardProps = {
  displayContent: boolean;
  onClose: () => void;
  currentTemplate?: template;
};

export default createLearningContentCardProps;
