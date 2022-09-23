import {
  Button,
  Card,
  Group,
  Slider,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useViewportSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { DeviceFloppy, InfoCircle } from 'tabler-icons-react';

import axiosInstance from '../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';

import templateAdaptionCardProps from '../../types/component_schemas/templateAdaptionCardProps';

import TemplateAdaptionSchema from '../../schemas/TemplateAdaptationSchema';

const TemplateAdaptationCard = ({
  currentTemplate,
  loading,
  fetchTemplate,
}: templateAdaptionCardProps) => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const mobile = width <= theme.breakpoints.md;
  const [componentLoading, setComponentLoading] = useState<boolean>(false);
  const form = useForm({
    validate: zodResolver(TemplateAdaptionSchema),
    initialValues: {
      default_knowledge: currentTemplate
        ? currentTemplate.default_knowledge
        : 50,
      knowledge_weight: currentTemplate ? currentTemplate.knowledge_weight : 50,
    },
  });
  useEffect(() => {
    form.setValues({
      default_knowledge: currentTemplate
        ? currentTemplate.default_knowledge
        : 50,
      knowledge_weight: currentTemplate ? currentTemplate.knowledge_weight : 50,
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
            ShowFailedNotification(
              'Error al actualizar el template',
              'Ocurrió un error inesperado al intentar actualizar el template. Por favor, intente nuevamente.'
            );
          }
          setComponentLoading(false);
        })}
      >
        <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
          <Title order={3}>Configuración Adaptativa</Title>
          <Group spacing={'xs'} align={'center'}>
            <Text weight="bold" size="md">
              Relevancia ante el Tópico
            </Text>
            <InfoCircle size={18} />
          </Group>
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
            disabled={loading || componentLoading}
          />
          <Group spacing={'xs'} align={'center'}>
            <Text weight="bold" size="md">
              Conocimiento por Defecto
            </Text>
            <InfoCircle size={18} />
          </Group>
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
            disabled={loading || componentLoading}
          />
          <Stack align={'center'}>
            <Button
              type={'submit'}
              color={'orange'}
              radius={'lg'}
              fullWidth={mobile}
              leftIcon={<DeviceFloppy size={25} />}
              loading={loading || componentLoading}
            >
              Actualizar Template
            </Button>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
};

export default TemplateAdaptationCard;
