import {
  Modal,
  ModalProps,
  Title,
  Stack,
  TextInput,
  Select,
  Slider,
  Text,
  Button,
  Grid,
} from '@mantine/core';
import topic from '../../types/api_schemas/topic';
import { useForm, zodResolver } from '@mantine/form';
import axiosInstance from '../../lib/constants/axiosInstance';
import TopicSchema from '../../schemas/TopicSchema';
import { useEffect, useState } from 'react';
import iconList from '../../lib/constants/iconList';
import IconSelectItem from '../atoms/IconSelectItem';
import { DeviceFloppy } from 'tabler-icons-react';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';

interface CreateTopicModalProps extends ModalProps {
  topicToUpdate?: topic;
}
const TopicModal = (props: CreateTopicModalProps) => {
  const { topicToUpdate, ...modalProps } = props;
  const [loading, setLoading] = useState(false);
  const form = useForm({
    validate: zodResolver(TopicSchema),
    initialValues: {
      title: topicToUpdate ? topicToUpdate.title : '',
      icon_name: topicToUpdate ? topicToUpdate.icon_name : '',
      default_knowledge: topicToUpdate ? topicToUpdate.default_knowledge : 50,
    },
  });
  useEffect(() => {
    if (topicToUpdate) {
      form.setValues({
        title: topicToUpdate.title,
        icon_name: topicToUpdate.icon_name,
        default_knowledge: topicToUpdate.default_knowledge,
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
            labelAlwaysOn
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

export default TopicModal;
