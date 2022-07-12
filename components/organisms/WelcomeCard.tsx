import { Card, Title, Text, Grid, Button, Image, Stack } from '@mantine/core';
const WelcomeCard = () => {
  return (
    <Card>
      <Card.Section>
        <Image src="home_image.png" alt="Students Drawing Sitting on a Book" />
      </Card.Section>
      <Stack justify="flex-start" style={{ paddingTop: '18px' }}>
        <Title order={3}>¡Bienvenido!</Title>
        <Text size={'md'}>
          Este es un prototipo de un Sistema de Hipermedia Adaptativa para los
          alumnos de Programación para Ingenieros. Esperamos que le sea de
          utilidad en su proceso de preparación para la asignatura.{' '}
        </Text>
        <Grid align="center" justify="space-around">
          <Grid.Col md={6}>
            <Button color={'dark'} radius={'lg'} fullWidth>
              Iniciar Sesión
            </Button>
          </Grid.Col>
          <Grid.Col md={6}>
            <Button color={'orange'} radius={'lg'} fullWidth>
              Registrarse
            </Button>
          </Grid.Col>
        </Grid>
      </Stack>
    </Card>
  );
};

export default WelcomeCard;
