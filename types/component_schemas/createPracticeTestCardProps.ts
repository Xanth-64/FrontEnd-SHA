import template from "../api_schemas/template";

type createPracticeTestCardProps = {
  displayContent: boolean;
  onClose: () => void;
  currentTemplate?: template;
};

export default createPracticeTestCardProps;
