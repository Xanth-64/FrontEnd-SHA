import { ModalProps } from '@mantine/core';

import template from '../api_schemas/template';

interface createTemplateModalProps extends ModalProps {
  templateToUpdate?: template;
  topicId?: string;
}

export default createTemplateModalProps;
