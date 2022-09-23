import { ModalProps } from '@mantine/core';

import adaptativeEvent from '../api_schemas/adaptativeEvent';

interface createAdaptativeEventModalProps extends ModalProps {
  adaptativeEventToUpdate?: adaptativeEvent;
  adaptativeObjectId?: string;
  supported_adaptative_events: string[];
  supported_adaptative_variables: string[];
}

export default createAdaptativeEventModalProps;
