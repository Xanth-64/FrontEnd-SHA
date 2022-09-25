import { Stack } from '@mantine/core';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const CardHolder = ({ children }: Props) => {
  return (
    <Stack
      style={{ width: '100%', padding: '14 36' }}
      align={'stretch'}
      justify={'flex-start'}
      spacing={64}
    >
      {children}
    </Stack>
  );
};

export default CardHolder;
