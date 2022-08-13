import { Card, Title, Stack } from '@mantine/core';

const PrecedenceGraphCard = () => {
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <Title order={3}>Precedence Graph</Title>
      </Stack>
    </Card>
  );
};

export default PrecedenceGraphCard;