import {
  Card,
  Title,
  Stack,
  Grid,
  TextInput,
  Center,
  Button,
  Image,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import axiosInstance from '../../lib/constants/axiosInstance';
import useUser from '../../lib/hooks/useUser';
import UpdateAccountSchema from '../../schemas/UpdateAccountSchema';
import CustomDropzone from '../atoms/CustomDropzone';

const TweakProfileCard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user, isLoading } = useUser();
  const { mutate } = useSWRConfig();
  const [currentFileUrl, setCurrentFileUrl] = useState<string>('');
  const updateUserImage = async (new_image_url: string) => {
    setLoading(true);
    setCurrentFileUrl(new_image_url);
    await axiosInstance.patch('auth/current_user_update', {
      image_url: new_image_url,
    });
    mutate('current_user/');
    setLoading(false);
  };
  const form = useForm({
    validate: zodResolver(UpdateAccountSchema),
    initialValues: {
      first_name: user?.user?.first_name || '',
      last_name: user?.user?.last_name || '',
    },
  });
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <Title order={3}>Personalizar Mi Perfil</Title>
        <Title order={4}>Información Personal</Title>
        <form
          onSubmit={form.onSubmit(async (values) => {
            try {
              setLoading(true);
              const data = await axiosInstance.put(
                '/auth/current_user_update',
                values
              );
              mutate('current_user/');
            } catch (error: any) {
              console.error(error);
            }
            setLoading(false);
          })}
        >
          <Grid gutter={'lg'}>
            <Grid.Col span={12} xs={6}>
              <Center>
                <TextInput
                  label={'Nombres'}
                  size={'lg'}
                  {...form.getInputProps('first_name')}
                  disabled={loading || isLoading}
                />
              </Center>
            </Grid.Col>
            <Grid.Col span={12} xs={6}>
              <Center>
                <TextInput
                  label={'Apellidos'}
                  size={'lg'}
                  {...form.getInputProps('last_name')}
                  disabled={loading || isLoading}
                />
              </Center>
            </Grid.Col>
            <Grid.Col span={12}>
              <Center>
                <Button
                  color={'dark'}
                  size={'lg'}
                  type={'submit'}
                  loading={loading || isLoading}
                >
                  Actualizar Información
                </Button>
              </Center>
            </Grid.Col>
          </Grid>
        </form>
        <Title order={4}>Foto de Perfil</Title>
        <CustomDropzone
          fileUrl={currentFileUrl}
          setFileUrl={updateUserImage}
          loading={loading}
          dropZonePrompt={'Coloque su nueva foto de perfil'}
        />
        <Center>
          <Image
            src={currentFileUrl}
            withPlaceholder
            width={200}
            height={80}
            alt="Selected profile picture."
          ></Image>
        </Center>
      </Stack>
    </Card>
  );
};

export default TweakProfileCard;
