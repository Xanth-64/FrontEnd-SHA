import { Card, Title, Stack } from '@mantine/core';

const ChangePasswordCard = () => {
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <Title order={3}>Cambiar Contraseña</Title>
      </Stack>
    </Card>
  );
};

export default ChangePasswordCard;
