import { ReactNode } from 'react';

import learningContent from '../api_schemas/learningContent';

type measurableInteractionDetectionWrapperProps = {
  children: ReactNode;
  learningContent?: learningContent | null;
};

export default measurableInteractionDetectionWrapperProps;
