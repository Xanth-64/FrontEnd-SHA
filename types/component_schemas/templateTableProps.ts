import template from '../api_schemas/template';

type templateTableProps = {
  updateTemplate: (template: template) => void;
  templates: template[];
  refetchData: () => void;
};

export default templateTableProps;
