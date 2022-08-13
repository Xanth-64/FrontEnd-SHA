import { Card, Title, Stack } from '@mantine/core';

const EnableInstructorsCard = () => {
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <Title order={3}>Habilitar Instructores</Title>
      </Stack>
    </Card>
  );
};

export default EnableInstructorsCard;
