import { Button, Card, Center, Grid, Image, Stack, Title } from '@mantine/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Custom404: NextPage = () => {
  const router = useRouter();
  return (
    <Center>
      <Grid gutter={20}>
        <Grid.Col span={12} xs={6} offsetXs={3}>
          <Card>
            <Image src="404_image.webp" alt="404 Error Image" />
            <Stack align={'center'} justify={'center'}>
              <Title order={3}>
                ¡Oops! La página que estás buscando no se pudo encontrar.
              </Title>
              <Button
                color={'dark'}
                fullWidth
                type={'button'}
                onClick={() => {
                  router.push('/home');
                }}
              >
                Volver al Sitio
              </Button>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Center>
  );
};

export default Custom404;
