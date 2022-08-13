import { Card, Title, Stack } from '@mantine/core';
const TemplateInfoEditorCard = () => {
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <Title order={3}>Información del Template</Title>
      </Stack>
    </Card>
  );
};

export default TemplateInfoEditorCard;
