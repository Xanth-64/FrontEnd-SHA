import practiceTest from '../api_schemas/practiceTest';
import template from '../api_schemas/template';

type createPracticeTestCardProps = {
  displayContent: boolean;
  onClose?: () => void;
  currentTemplate?: template;
  currentPracticeTest?: practiceTest;
};

export default createPracticeTestCardProps;
