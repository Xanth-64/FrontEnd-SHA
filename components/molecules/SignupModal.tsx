import {
  ModalProps,
  Modal,
  Stack,
  Title,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import SignupSchema from '../../schemas/SignupSchema';
import axiosInstance from '../../lib/constants/axiosInstance';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import useUser from '../../lib/hooks/useUser';
import { useSWRConfig } from 'swr';
interface SignupModalProps extends ModalProps {
  userRedirect: () => void;
}

const SignupModal = (props: SignupModalProps) => {
  const { userRedirect, ...modalProps } = props;
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const { user, isLoading } = useUser();
  const form = useForm({
    validate: zodResolver(SignupSchema),
    initialValues: {
      email: '',
      password: '',
      confirm: '',
      instructor: false,
    },
  });
  const router = useRouter();
  return (
    <Modal
      {...modalProps}
      closeOnClickOutside={!loading}
      closeOnEscape={!loading}
      withCloseButton={!loading}
      style={{ padding: '36 28' }}
    >
      <form
        onSubmit={form.onSubmit(async (values) => {
          const submitValues = {
            email: values.email,
            password: values.password,
            role: values.instructor ? 'teacher' : 'student',
            first_name: '',
            last_name: '',
            image_url: '',
          };
          try {
            setLoading(true);
            const response = await axiosInstance.post(
              'auth/signup',
              submitValues
            );

            if (response.status === 200) {
              setCookie('idToken', response.data.data.idToken, {
                maxAge: response.data.data.expiresIn,
              });
              await mutate('current_user/');
              if (user) {
                router.push(`/${user?.role[0].role_name}`);
              }
              if (loading) {
                router.push('home/user_auth_buffer');
              }
              return;
            }
          } catch (error: any) {
            console.error(error);
            if (error?.response?.status === 403) {
              if (error.response.data.data.error === 'EMAIL_ALREADY_EXISTS') {
                form.setErrors({
                  email: 'El correo elegido se encuenta actualmente en uso.',
                });
              }
            }
            if (error?.response?.status === 500) {
              form.setErrors({
                email: '¡Error interno del servidor! Intente nuevamente.',
              });
            }
          }
          setLoading(false);
        })}
      >
        <Stack spacing={24} align={'center'} justify={'center'}>
          <Title order={1}>Registrarse</Title>

          <TextInput
            label="Correo Electrónico"
            description="Se recomienda utilizar su correo @unimet.edu.ve"
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
          <PasswordInput
            label="Confirmar Contraseña"
            size={'md'}
            style={{ width: '100%' }}
            {...form.getInputProps('confirm')}
            disabled={loading}
          />
          <Checkbox
            label="Soy un Instructor"
            color="orange"
            {...form.getInputProps('instructor')}
            disabled={loading}
          />
          <Button
            type="submit"
            color={'orange'}
            radius={'lg'}
            fullWidth
            loading={loading}
          >
            Registrarse
          </Button>
          <div>
            <Text size={'sm'}>
              ¿Ya tienes una cuenta?{' '}
              <Text
                size={'sm'}
                underline
                component="span"
                color={'orange'}
                weight={'bold'}
                variant={'link'}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  userRedirect();
                }}
              >
                Iniciar Sesión{' '}
              </Text>
            </Text>
          </div>
        </Stack>
      </form>
    </Modal>
  );
};

export default SignupModal;
