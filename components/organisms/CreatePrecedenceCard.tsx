import { Card, Title, Stack } from '@mantine/core';

const CreatePrecedenceCard = () => {
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <Title order={3}>Create Precedence</Title>
      </Stack>
    </Card>
  );
};

export default CreatePrecedenceCard;
