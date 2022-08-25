import { Card, Stack, Title, Transition } from '@mantine/core';
import createPracticeTestCardProps from '../../types/component_schemas/createPracticeTestCardProps';

export const CreatePracticeTestCard = ({
  displayContent,
  onClose,
}: createPracticeTestCardProps) => {
  return (
    <Transition
      mounted={displayContent}
      transition={'slide-left'}
      duration={400}
    >
      {(styles) => {
        return (
          <Card shadow={'sm'} radius={'md'} style={styles}>
            <Stack spacing={'xl'} style={{ padding: '36px 28px'  }}>
              <Title order={3}>Crear Prueba de Práctica</Title>
            </Stack>
          </Card>
        );
      }}
    </Transition>
  );
};

export default CreatePracticeTestCard;
