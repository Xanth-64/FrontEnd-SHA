import {
  Button,
  Modal,
  ModalProps,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

import axiosInstance from '../../lib/constants/axiosInstance';
import useUser from '../../lib/hooks/useUser';

import LoginSchema from '../../schemas/LoginSchema';

const LoginModal = (props: ModalProps) => {
  const form = useForm({
    validate: zodResolver(LoginSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { user } = useUser();
  return (
    <Modal
      {...props}
      closeOnClickOutside={!loading}
      closeOnEscape={!loading}
      withCloseButton={!loading}
      style={{ padding: '36 28' }}
    >
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            setLoading(true);
            const response = await axiosInstance.post('/auth/login', values);
            if (response.status === 200) {
              setCookie('idToken', response.data.data.idToken, {
                maxAge: response.data.data.expiresIn,
              });
              await mutate('current_user/');
              router.push(`${user?.role[0].role_name}`);
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
            disabled={loading}
          />
          <PasswordInput
            label="Contraseña"
            size={'md'}
            style={{ width: '100%' }}
            {...form.getInputProps('password')}
            disabled={loading}
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
