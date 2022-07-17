import {
  ModalProps,
  Modal,
  Stack,
  Title,
  TextInput,
  PasswordInput,
  Button,
} from '@mantine/core';

import { useForm, zodResolver } from '@mantine/form';
import LoginSchema from '../../schemas/LoginSchema';

const LoginModal = (props: ModalProps) => {
  const form = useForm({
    schema: zodResolver(LoginSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });
  return (
    <Modal {...props} style={{ padding: '36 28' }}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
          <Button type="submit" color={'orange'} radius={'lg'} fullWidth>
            Iniciar Sesión
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default LoginModal;
