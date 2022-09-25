import template from '../api_schemas/template';

type templateInfoEditorCardProps = {
  currentTemplate?: template;
  loading: boolean;
  fetchTemplate: () => void;
};

export default templateInfoEditorCardProps;
