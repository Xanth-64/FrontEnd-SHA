import {
  Button,
  Grid,
  Modal,
  Slider,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { DeviceFloppy } from 'tabler-icons-react';

import axiosInstance from '../../lib/constants/axiosInstance';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';

import createTemplateModalProps from '../../types/component_schemas/createTemplateModalProps';

import TemplateSchema from '../../schemas/TemplateSchema';

const CreateTemplateModal = ({
  templateToUpdate,
  topicId,
  ...modalProps
}: createTemplateModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    validate: zodResolver(TemplateSchema),
    initialValues: {
      title: templateToUpdate ? templateToUpdate.title : '',
      description: templateToUpdate ? templateToUpdate.description : '',
      default_knowledge: templateToUpdate
        ? templateToUpdate.default_knowledge
        : 50,
      knowledge_weight: templateToUpdate
        ? templateToUpdate.knowledge_weight
        : 50,
      leak_parameter: templateToUpdate ? templateToUpdate.leak_parameter : 0,
    },
  });
  useEffect(() => {
    if (templateToUpdate) {
      form.setValues({
        title: templateToUpdate.title,
        description: templateToUpdate.description,
        default_knowledge: templateToUpdate.default_knowledge,
        knowledge_weight: templateToUpdate.knowledge_weight,
        leak_parameter: templateToUpdate.leak_parameter,
      });
      return;
    }
    form.reset();
  }, [templateToUpdate]);
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
          setLoading(true);
          try {
            if (templateToUpdate) {
              const response = await axiosInstance.put(
                `/templates/${templateToUpdate.id}`,
                {
                  ...values,
                }
              );
              ShowSuccessfullCreate(
                'Template actualizado exitosamente',
                `Template "${response.data.data.title}" actualizado.`
              );
              modalProps.onClose();
            } else {
              const response = await axiosInstance.post('/templates/', {
                topic_id: topicId,
                image_url: '',
                ...values,
              });
              ShowSuccessfullCreate(
                'Template creado exitosamente',
                `Template "${response.data.data.title}" creado.`
              );
              modalProps.onClose();
            }
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
          setLoading(false);
        })}
      >
        <Stack spacing={'xl'} style={{ padding: '36 28' }}>
          <Title order={3}>Configuración de Template</Title>
          <TextInput
            label="Título"
            description="Título del Template"
            placeholder="Bloques If... Else"
            size={'md'}
            {...form.getInputProps('title')}
            disabled={loading}
          />
          <Textarea
            label="Descripción"
            description="Descripción del Template"
            placeholder="..."
            size={'md'}
            {...form.getInputProps('description')}
            disabled={loading}
          />
          <Text weight="bold" size="md">
            Conocimiento por Defecto
          </Text>
          <Slider
            color={'orange'}
            marks={[
              { value: 0, label: '0' },
              { value: 25, label: '25' },
              { value: 50, label: '50' },
              { value: 75, label: '75' },
              { value: 100, label: '100' },
            ]}
            value={form.values.default_knowledge}
            onChange={(value) => {
              form.setFieldValue('default_knowledge', value);
            }}
            disabled={loading}
          />
          <Text weight="bold" size="md">
            Ponderación
          </Text>
          <Slider
            color={'orange'}
            marks={[
              { value: 0, label: '0' },
              { value: 25, label: '25' },
              { value: 50, label: '50' },
              { value: 75, label: '75' },
              { value: 100, label: '100' },
            ]}
            value={form.values.knowledge_weight}
            onChange={(value) => {
              form.setFieldValue('knowledge_weight', value);
            }}
            disabled={loading}
          />
          <Text weight="bold" size="md">
            Parámetro de Fuga
          </Text>
          <Slider
            color={'orange'}
            marks={[
              { value: 0, label: '0' },
              { value: 1, label: '1' },
              { value: 2, label: '2' },
              { value: 3, label: '3' },
              { value: 4, label: '4' },
              { value: 5, label: '5' },
            ]}
            step={0.1}
            value={form.values.leak_parameter}
            onChange={(value) => {
              form.setFieldValue('leak_parameter', value);
            }}
            min={0}
            max={5}
            disabled={loading}
          />
          <Grid style={{ width: '100%' }}>
            <Grid.Col span={12} xs={4} offsetXs={4}>
              <Button
                fullWidth
                color="orange"
                radius={'lg'}
                leftIcon={<DeviceFloppy size={25} />}
                type="submit"
                loading={loading}
              >
                Guardar
              </Button>
            </Grid.Col>
          </Grid>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateTemplateModal;
