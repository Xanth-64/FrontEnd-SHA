import {
  Button,
  Center,
  Grid,
  Group,
  Modal,
  ModalProps,
  Select,
  Slider,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useViewportSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  DeviceFloppy,
  InfoCircle,
} from 'tabler-icons-react';

import axiosInstance from '../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';

import prelation from '../../types/api_schemas/prelation';
import topic from '../../types/api_schemas/topic';

import TopicSelectItem from '../atoms/TopicSelectItem';

import PrelationSchema from '../../schemas/PrelationSchema';

interface CreatePrecedenceModalProps extends ModalProps {
  prelationToUpdate?: prelation;
}

const CreatePrecedenceModal = (props: CreatePrecedenceModalProps) => {
  const { prelationToUpdate, ...modalProps } = props;
  const [topicList, setTopicList] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { width } = useViewportSize();
  const theme = useMantineTheme();
  const mobile = width < theme.breakpoints.md;
  const form = useForm({
    validate: zodResolver(PrelationSchema),
    initialValues: {
      predecessor: prelationToUpdate ? prelationToUpdate.predecessor?.id : '',
      successor: prelationToUpdate ? prelationToUpdate.successor?.id : '',
      knowledge_weight: prelationToUpdate
        ? prelationToUpdate.knowledge_weight
        : 50,
    },
  });
  useEffect(() => {
    const inner_function = async () => {
      try {
        const response = await axiosInstance.get('/topics/');
        setTopicList(
          response.data.data.map((topic: topic) => {
            return {
              value: topic.id,
              label: topic.title,
              icon: topic.icon_name,
            };
          })
        );
      } catch (error: any) {
        ShowFailedNotification(
          'Error recuperando los tópicos',
          'Error al recuperar los tópicos, intente nuevamente.'
        );
        modalProps.onClose();
      }
    };
    inner_function();
  }, []);
  useEffect(() => {
    if (prelationToUpdate) {
      console.log('Setting Form Values');
      console.log(prelationToUpdate);
      form.setValues({
        predecessor: prelationToUpdate.predecessor?.id,
        successor: prelationToUpdate.successor?.id,
        knowledge_weight: prelationToUpdate.knowledge_weight,
      });
      return;
    }
  }, [prelationToUpdate]);
  return (
    <Modal
      {...modalProps}
      closeOnClickOutside={!loading}
      closeOnEscape={!loading}
      withCloseButton={!loading}
      style={{ padding: '36 28' }}
      onClose={() => {
        form.reset();
        modalProps.onClose();
      }}
    >
      <form
        onSubmit={form.onSubmit(async (values) => {
          setLoading(true);
          try {
            if (prelationToUpdate) {
              await axiosInstance.put(
                `/topics/prelations/${prelationToUpdate.id}`,
                { knowledge_weight: values.knowledge_weight }
              );
              ShowSuccessfullCreate(
                'Prelación actualizada exitosamente.',
                'Prelación actualizada.'
              );
            } else {
              const response = await axiosInstance.post(
                '/topics/prelations/',
                values
              );
              ShowSuccessfullCreate(
                'Prelación creada exitosamente.',
                `Prelación entre ${response.data.data.predecessor.title} y ${response.data.data.successor.title} creada exitosamente`
              );
            }
            modalProps.onClose();
          } catch (error: any) {
            if (error.response.data) {
              if (error.response.data.data.error === 'ALREADY_EXISTS') {
                form.setErrors({
                  predecessor:
                    'Ya existe una prelación directa entre estos tópicos',
                  successor:
                    'Ya existe una prelación directa entre estos tópicos',
                });
              }
              if (error.response.data.data.error === 'PATH_EXISTS') {
                form.setErrors({
                  predecessor:
                    'Ya existe una prelación indirecta entre estos tópicos',
                  successor:
                    'Ya existe una prelación indirecta entre estos tópicos',
                });
              }
              if (error.response.data.data.error === 'CIRCULAR_PRECEDENCE') {
                form.setErrors({
                  predecessor:
                    'La prelación genera una dependencia circular entre tópicos',
                  successor:
                    'La prelación genera una dependencia circular entre tópicos',
                });
              }
            }
          } finally {
            setLoading(false);
          }
        })}
      >
        <Stack spacing={'xl'}>
          <Title order={3}>Configuración de Precedencia</Title>
          <Text weight="bold" size="md">
            Grado de Prelación
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
            value={form.values.knowledge_weight}
            onChange={(value) => {
              form.setFieldValue('knowledge_weight', value);
            }}
            disabled={loading}
          />
          <Group spacing={'xs'} align={'center'}>
            <Text weight="bold" size="md">
              Establecer Relación
            </Text>
            <InfoCircle size={18} />
          </Group>
          <Grid align={'center'} justify={'center'}>
            <Grid.Col span={12} md={5}>
              <Center>
                <Select
                  label={<Text align={'center'}>Topico Prelatorio</Text>}
                  labelProps={{ style: { width: '100%' } }}
                  description={'Tópico que el Estudiante debería ver primero.'}
                  data={topicList}
                  searchable
                  disabled={loading || prelationToUpdate}
                  itemComponent={TopicSelectItem}
                  {...form.getInputProps('predecessor')}
                />
              </Center>
            </Grid.Col>
            <Grid.Col span={12} md={2}>
              <Center>
                {mobile ? <ArrowDown size={64} /> : <ArrowRight size={64} />}
              </Center>
            </Grid.Col>
            <Grid.Col span={12} md={5}>
              <Center>
                <Select
                  label={<Text align={'center'}>Topico Objetivo</Text>}
                  labelProps={{ style: { width: '100%' } }}
                  description={'Topico que el Estudiante debería ver después.'}
                  data={topicList}
                  searchable
                  disabled={loading || prelationToUpdate}
                  itemComponent={TopicSelectItem}
                  {...form.getInputProps('successor')}
                />
              </Center>
            </Grid.Col>
          </Grid>
          <Grid align={'center'} justify={'center'}>
            <Grid.Col offset={1} span={10} md={3} offsetMd={9}>
              <Center>
                <Button
                  color={'orange'}
                  leftIcon={<DeviceFloppy size={25} />}
                  radius={'lg'}
                  fullWidth
                  loading={loading}
                  type="submit"
                >
                  Guardar
                </Button>
              </Center>
            </Grid.Col>
          </Grid>
        </Stack>
      </form>
    </Modal>
  );
};
export default CreatePrecedenceModal;
