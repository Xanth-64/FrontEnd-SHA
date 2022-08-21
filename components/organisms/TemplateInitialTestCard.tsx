import { Card, Title, Stack } from '@mantine/core';
import templateInitialTestCardProps from '../../types/component_schemas/templateInitialTestCardProps';
const TemplateInitialTestCard = ({}: templateInitialTestCardProps) => {
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <Title order={3}>Estadísticas de Prueba Inicial</Title>
      </Stack>
    </Card>
  );
};

export default TemplateInitialTestCard;
