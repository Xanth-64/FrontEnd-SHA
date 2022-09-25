import {
  Button,
  Grid,
  Modal,
  ModalProps,
  Select,
  Slider,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { DeviceFloppy } from 'tabler-icons-react';

import axiosInstance from '../../lib/constants/axiosInstance';
import iconList from '../../lib/constants/iconList';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';

import topic from '../../types/api_schemas/topic';

import IconSelectItem from '../atoms/IconSelectItem';

import TopicSchema from '../../schemas/TopicSchema';

interface CreateTopicModalProps extends ModalProps {
  topicToUpdate?: topic;
}
const CreateTopicModal = (props: CreateTopicModalProps) => {
  const { topicToUpdate, ...modalProps } = props;
  const [loading, setLoading] = useState(false);
  const form = useForm({
    validate: zodResolver(TopicSchema),
    initialValues: {
      title: topicToUpdate ? topicToUpdate.title : '',
      icon_name: topicToUpdate ? topicToUpdate.icon_name : '',
      default_knowledge: topicToUpdate ? topicToUpdate.default_knowledge : 50,
      leak_parameter: topicToUpdate ? topicToUpdate.leak_parameter : 0,
    },
  });
  useEffect(() => {
    if (topicToUpdate) {
      form.setValues({
        title: topicToUpdate.title,
        icon_name: topicToUpdate.icon_name,
        default_knowledge: topicToUpdate.default_knowledge,
        leak_parameter: topicToUpdate ? topicToUpdate.leak_parameter : 0,
      });
      return;
    }
    form.reset();
  }, [topicToUpdate]);
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
            if (topicToUpdate) {
              const response = await axiosInstance.put(
                `/topics/${topicToUpdate.id}`,
                values
              );
              ShowSuccessfullCreate(
                'Tópico actualizado exitosamente.',
                `Tópico "${response.data.data.title}" actualizado.`
              );
              modalProps.onClose();
              form.reset();
            } else {
              const response = await axiosInstance.post('/topics/', values);
              ShowSuccessfullCreate(
                'Tópico creado exitosamente.',
                `Tópico "${response.data.data.title}" creado.`
              );
              modalProps.onClose();
              form.reset();
            }
          } catch (error: any) {
            if (error.response.status === 400) {
              form.setErrors({ title: 'Ya existe un tópico con ese nombre.' });
            } else {
              form.setErrors({
                title: 'Ha ocurrido un error inesperado. Intente nuevamente.',
              });
            }
          }
          setLoading(false);
        })}
      >
        <Stack spacing={36}>
          <Title order={3}>Configuración de Tópico</Title>
          <TextInput
            label="Título"
            description="Título del Tópico"
            placeholder="Estructuras Selectivas"
            size={'md'}
            {...form.getInputProps('title')}
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
          <Select
            data={iconList}
            itemComponent={IconSelectItem}
            searchable
            label={'Ícono'}
            description={'Ícono del tópico a mostrar al estudiante.'}
            {...form.getInputProps('icon_name')}
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

export default CreateTopicModal;
