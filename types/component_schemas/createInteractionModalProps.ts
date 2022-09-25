import { ModalProps } from '@mantine/core';

import measurableInteraction from '../api_schemas/measurableInteraction';

interface createInteractionModalProps extends ModalProps {
  interactionToUpdate?: measurableInteraction;
  learningContentId?: string;
}

export default createInteractionModalProps;
