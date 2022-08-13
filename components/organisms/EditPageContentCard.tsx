import { Card, Title, Stack } from '@mantine/core';

const EditPageContentCard = () => {
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <Title order={3}>Edit Page Content</Title>
      </Stack>
    </Card>
  );
};

export default EditPageContentCard;
