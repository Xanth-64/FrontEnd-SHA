import template from '../api_schemas/template';
import { ModalProps } from '@mantine/core';

interface createTemplateModalProps extends ModalProps {
  templateToUpdate?: template;
  topicId?: string;
}

export default createTemplateModalProps;
