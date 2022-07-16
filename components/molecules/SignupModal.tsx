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

import { useForm, zodResolver } from '@mantine/form';
import SignupSchema from '../../schemas/SignupSchema';

interface SignupModalProps extends ModalProps {
  userRedirect: () => void;
}

const SignupModal = (props: SignupModalProps) => {
  const { userRedirect, ...modalProps } = props;
  const form = useForm({
    schema: zodResolver(SignupSchema),
    initialValues: {
      email: '',
      password: '',
      confirm: '',
      instructor: false,
    },
  });
  return (
    <Modal {...modalProps} style={{ padding: '36 28' }}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack spacing={24} align={'center'} justify={'center'}>
          <Title order={1}>Registrarse</Title>

          <TextInput
            label="Correo Electrónico"
            description="Se recomienda utilizar su correo @unimet.edu.ve"
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
          <PasswordInput
            label="Confirmar Contraseña"
            size={'md'}
            style={{ width: '100%' }}
            {...form.getInputProps('confirm')}
          />
          <Checkbox
            label="Soy un Instructor"
            color="orange"
            {...form.getInputProps('instructor')}
          />
          <Button type="submit" color={'orange'} radius={'lg'} fullWidth>
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
