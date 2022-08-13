import { Card, Title, Stack } from '@mantine/core';
import createTemplateCardProps from '../../types/component_schemas/createTemplateCardProps';

const CreateTemplateCard = ({ topic }: createTemplateCardProps) => {
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <Title order={3}>Create Template</Title>
      </Stack>
    </Card>
  );
};

export default CreateTemplateCard;
