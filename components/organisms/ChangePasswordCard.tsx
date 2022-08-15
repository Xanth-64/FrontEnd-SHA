import {
  Card,
  Title,
  Stack,
  PasswordInput,
  Center,
  Button,
  Grid,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import axiosInstance from '../../lib/constants/axiosInstance';
import ChangePasswordSchema from '../../schemas/ChangePasswordSchema';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';
const ChangePasswordCard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    validate: zodResolver(ChangePasswordSchema),
    initialValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
    },
  });
  return (
    <Card shadow={'sm'} radius={'md'}>
      <form
        onSubmit={form.onSubmit(async (values) => {
          setLoading(true);
          try {
            const { new_password, old_password } = values;
            const response = await axiosInstance.put('/auth/change_password', {
              new_password,
              old_password,
            });
            form.reset();
            ShowSuccessfullCreate(
              'Cambio de contraseña',
              'Cambio de contraseña exitoso.'
            );
          } catch (error: any) {
            if (error?.response?.status === 400) {
              if (error.response.data.data.error === 'INVALID_PASSWORD') {
                form.setErrors({
                  old_password: 'La contraseña actual es incorrecta',
                });
              }
            }
          }
          setLoading(false);
        })}
      >
        <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
          <Title order={3}>Cambiar Contraseña</Title>
          <Grid gutter={'xl'}>
            <Grid.Col span={12} xs={12}>
              <PasswordInput
                label={'Contraseña actual'}
                size={'lg'}
                {...form.getInputProps('old_password')}
                disabled={loading}
              />
            </Grid.Col>
            <Grid.Col span={12} xs={6}>
              <PasswordInput
                label={'Contraseña nueva'}
                size={'lg'}
                {...form.getInputProps('new_password')}
                disabled={loading}
              />
            </Grid.Col>
            <Grid.Col span={12} xs={6}>
              <PasswordInput
                label={'Confirmar contraseña'}
                size={'lg'}
                {...form.getInputProps('confirm_password')}
                disabled={loading}
              />
            </Grid.Col>
          </Grid>
          <Center>
            <Button
              loading={loading}
              size={'lg'}
              color={'dark'}
              type={'submit'}
            >
              Cambiar Contraseña
            </Button>
          </Center>
        </Stack>
      </form>
    </Card>
  );
};

export default ChangePasswordCard;
