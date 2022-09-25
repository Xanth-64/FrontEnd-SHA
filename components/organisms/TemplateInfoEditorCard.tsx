import {
  Button,
  Card,
  Center,
  Grid,
  Image,
  Stack,
  TextInput,
  Textarea,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useViewportSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { DeviceFloppy } from 'tabler-icons-react';

import axiosInstance from '../../lib/constants/axiosInstance';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';

import templateInfoEditorCardProps from '../../types/component_schemas/templateInfoEditorCardProps';

import CustomDropzone from '../atoms/CustomDropzone';

import TemplateInfoEditSchema from '../../schemas/TemplateInfoEditSchema';

const TemplateInfoEditorCard = ({
  currentTemplate,
  fetchTemplate,
  loading,
}: templateInfoEditorCardProps) => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const mobile = width <= theme.breakpoints.md;
  const form = useForm({
    validate: zodResolver(TemplateInfoEditSchema),
    initialValues: {
      title: currentTemplate?.title || '',
      description: currentTemplate?.description || '',
      image_url: currentTemplate?.image_url || '',
    },
  });
  const [componentLoading, setComponentLoading] = useState<boolean>(false);
  useEffect(() => {
    form.setValues({
      title: currentTemplate?.title || '',
      description: currentTemplate?.description || '',
      image_url: currentTemplate?.image_url || '',
    });
  }, [currentTemplate]);
  return (
    <Card shadow={'sm'} radius={'md'}>
      <form
        onSubmit={form.onSubmit(async (values) => {
          setComponentLoading(true);
          try {
            const response = await axiosInstance.put(
              `/templates/${currentTemplate?.id}`,
              values
            );
            ShowSuccessfullCreate(
              'Template actualizado exitosamente',
              `Template "${response.data.data.title}" actualizado.`
            );
            fetchTemplate();
          } catch (error: any) {
            if (error.response.status === 400) {
              form.setErrors({
                title: 'Ya existe un template con ese nombre.',
              });
            } else {
              form.setErrors({
                title: 'Ha ocurrido un error inesperado. Intente nuevamente.',
              });
            }
          }
          setComponentLoading(false);

          console.log(values);
        })}
      >
        <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
          <Title order={3}>Información del Template</Title>
          <TextInput
            label="Título"
            description="Título del Template"
            placeholder="Bloques If... Else"
            size={'md'}
            {...form.getInputProps('title')}
            disabled={loading || componentLoading}
          />
          <Textarea
            label="Descripción"
            description="Descripción del Template"
            placeholder="..."
            size={'md'}
            {...form.getInputProps('description')}
            disabled={loading || componentLoading}
            autosize
            maxRows={10}
          />
          <TextInput
            disabled
            {...form.getInputProps('image_url')}
            style={{ display: 'none' }}
          />
          <Grid align={'center'} justify={'center'}>
            <Grid.Col span={12} xs={6}>
              <Center>
                <Image
                  alt="Imagen Representativa del Template"
                  withPlaceholder
                  src={form.values.image_url}
                  width={300}
                  height={300}
                />
              </Center>
            </Grid.Col>
            <Grid.Col span={12} xs={6}>
              <CustomDropzone
                fileUrl={form.values.image_url}
                setFileUrl={(fileUrl) => {
                  form.setValues({
                    ...form.values,
                    image_url: fileUrl,
                  });
                }}
                loading={loading || componentLoading}
                dropZonePrompt={
                  'Coloque una imagen para representar el Template'
                }
              />
            </Grid.Col>
          </Grid>
          <Stack align={'center'}>
            <Button
              type={'submit'}
              color={'orange'}
              radius={'lg'}
              leftIcon={<DeviceFloppy size={25} />}
              loading={loading || componentLoading}
              fullWidth={mobile}
            >
              Actualizar Template
            </Button>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
};

export default TemplateInfoEditorCard;
