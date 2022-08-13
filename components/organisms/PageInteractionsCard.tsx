import { Card, Title, Stack } from '@mantine/core';

const PageInteractionsCard = () => {
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <Title order={3}>Definir Interacciones</Title>
      </Stack>
    </Card>
  );
};

export default PageInteractionsCard;
