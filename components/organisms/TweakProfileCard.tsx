import { Card, Title, Stack } from '@mantine/core';

const TweakProfileCard = () => {
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <Title order={3}>Personalizar Mi Perfil</Title>
      </Stack>
    </Card>
  );
};

export default TweakProfileCard;
