import { Card, Title, Stack } from '@mantine/core';
const TemplateAdaptationCard = () => {
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <Title order={3}>Configuración Adaptativa</Title>
      </Stack>
    </Card>
  );
};

export default TemplateAdaptationCard;
