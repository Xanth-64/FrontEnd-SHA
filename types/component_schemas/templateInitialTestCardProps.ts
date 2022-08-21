import template from '../api_schemas/template';

type templateInitialTestCardProps = {
  currentTemplate?: template;
  loading: boolean;
  fetchTemplate: () => void;
};

export default templateInitialTestCardProps;
