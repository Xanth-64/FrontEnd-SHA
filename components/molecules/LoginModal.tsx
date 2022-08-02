import {
  ModalProps,
  Modal,
  Stack,
  Title,
  TextInput,
  PasswordInput,
  Button,
} from '@mantine/core';
import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/router';
import LoginSchema from '../../schemas/LoginSchema';
import axiosInstance from '../../lib/axiosInstance';
import { setCookie } from 'cookies-next';

const LoginModal = (props: ModalProps) => {
  const form = useForm({
    schema: zodResolver(LoginSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <Modal {...props} style={{ padding: '36 28' }}>
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            setLoading(true);
            const response = await axiosInstance.post('/auth/login', values);
            if (response.status === 200) {
              setCookie('idToken', response.data.data.idToken, {
                maxAge: response.data.data.expiresIn,
              });
              router.push('/teacher/dashboard');
              return;
            }
          } catch (error: any) {
            console.error(error);
            if (error.response.status === 403) {
              if (error.response.data.data.error === 'EMAIL_PASSWORD_WRONG') {
                form.setErrors({
                  email:
                    'Correo electrónico o contraseña incorrectos. Por favor, intente nuevamente.',
                  password:
                    'Correo electrónico o contraseña incorrectos. Por favor, intente nuevamente.',
                });
              }
            }
            if (error.response.status === 500) {
              form.setErrors({
                email: '¡Error interno del servidor! Intente nuevamente.',
              });
            }
          }
          setLoading(false);
        })}
      >
        <Stack spacing={24} align={'center'} justify={'center'}>
          <Title order={1}>Iniciar Sesión</Title>

          <TextInput
            label="Correo Electrónico"
            placeholder="john.smith@email.com"
            size={'md'}
            style={{ width: '100%' }}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Contraseña"
            size={'md'}
            style={{ width: '100%' }}
            {...form.getInputProps('password')}
          />
          <Button
            type="submit"
            color={'orange'}
            radius={'lg'}
            fullWidth
            loading={loading}
          >
            Iniciar Sesión
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default LoginModal;
