import {
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Slider,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { DeviceFloppy } from 'tabler-icons-react';

import axiosInstance from '../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';
import mapInteractionTriggers from '../../lib/utils/mapInteractionTriggers';

import createInteractionModalProps from '../../types/component_schemas/createInteractionModalProps';

import MeasurableInteractionSchema from '../../schemas/MeasurableInteractionSchema';

const CreateInteractionModal = ({
  interactionToUpdate,
  learningContentId,
  ...modalProps
}: createInteractionModalProps) => {
  const [componentLoading, setComponentLoading] = useState<boolean>(false);
  const form = useForm({
    validate: zodResolver(MeasurableInteractionSchema),
    initialValues: {
      interaction_weight: interactionToUpdate?.interaction_weight ?? 50,
      interaction_threshold: interactionToUpdate?.interaction_threshold ?? 1,
      interaction_trigger: interactionToUpdate?.interaction_trigger ?? 'click',
      learning_style_attribute:
        interactionToUpdate?.learning_style_attribute ?? null,
    },
  });
  useEffect(() => {
    if (interactionToUpdate) {
      form.setValues({
        interaction_weight: interactionToUpdate?.interaction_weight ?? 50,
        interaction_threshold: interactionToUpdate?.interaction_threshold ?? 1,
        interaction_trigger:
          interactionToUpdate?.interaction_trigger ?? 'click',
        learning_style_attribute:
          interactionToUpdate?.learning_style_attribute ?? null,
      });
    }
  }, [interactionToUpdate]);
  return (
    <Modal
      {...modalProps}
      closeOnClickOutside={!componentLoading}
      closeOnEscape={!componentLoading}
      withCloseButton={!componentLoading}
      style={{ padding: '36 28' }}
    >
      <form
        onSubmit={form.onSubmit(async (values) => {
          if (learningContentId) {
            setComponentLoading(true);
            try {
              if (interactionToUpdate) {
                await axiosInstance.put(
                  `/measurable_interaction/${interactionToUpdate.id}`,
                  {
                    ...values,
                  }
                );
                ShowSuccessfullCreate(
                  'Interacción actualizada exitosamente.',
                  `Interacción de tipo ${mapInteractionTriggers(
                    values.interaction_trigger
                  )} actualizada exitosamente.`
                );
              } else {
                await axiosInstance.post('/measurable_interaction/', {
                  ...values,
                  learning_content_id: learningContentId,
                });
                ShowSuccessfullCreate(
                  'Interacción creada exitosamente.',
                  `Interacción de tipo ${mapInteractionTriggers(
                    values.interaction_trigger
                  )} creada exitosamente.`
                );
              }
              modalProps.onClose();
              form.reset();
            } catch (error: any) {
              const { response } = error;
              if (
                response?.data?.data?.error ===
                'MEASURABLE_INTERACTION_WITH_INTERACTIONS_FIRED'
              ) {
                form.setErrors({
                  interaction_trigger:
                    'Esta interacción ya ha sido disparada por algunos usuarios. No puede modificarse.',
                });
              } else {
                form.setErrors({
                  interaction_trigger:
                    'Ha ocurrido un error inesperado en el servidor. Intente nuevamente.',
                });
              }
            }
            setComponentLoading(false);
          }
        })}
      >
        <Stack spacing={'xl'} style={{ padding: '36 28' }}>
          <Title order={3}>Configuración de Interacción</Title>
          <Select
            label={'Tipo de Interacción'}
            description={
              'Acción del usuario que dispara que la interacción pueda percibirse.'
            }
            data={[
              {
                label: 'Pulsar',
                value: 'click',
              },
              {
                label: 'Visualizar',
                value: 'observe',
              },
              {
                label: 'Visualizar sin Movimiento',
                value: 'idle_observe',
              },
            ]}
            allowDeselect={false}
            searchable
            dropdownPosition={'bottom'}
            withinPortal
            {...form.getInputProps('interaction_trigger')}
            disabled={componentLoading}
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
            value={form.values.interaction_weight}
            onChange={(value) => {
              form.setFieldValue('interaction_weight', value);
            }}
            disabled={componentLoading}
          />
          <NumberInput
            label={'Umbral de Percepción'}
            description={
              'Magnitud del Evento que se considera como "medible". En caso de "Pulsar" es cantidad de clicks y en caso de eventos de tipo Visualizar se refiere a segundos.'
            }
            min={1}
            {...form.getInputProps('interaction_threshold')}
          />
          <Select
            label={'Estilo de Aprendizaje'}
            description={
              'Opcional: Estilo de aprendizaje confirmado por esta interacción. De omitir se asumirá que la interacción confirma conocimientos.'
            }
            data={[
              {
                label: 'Visual',
                value: 'VISUAL',
              },
              {
                label: 'Auditivo',
                value: 'AURAL',
              },
              {
                label: 'Kinestésico',
                value: 'KINESTHETIC',
              },
              {
                label: 'Lectura/Escritura',
                value: 'TEXTUAL',
              },
            ]}
            allowDeselect={true}
            searchable
            withinPortal
            {...form.getInputProps('learning_style_attribute')}
            disabled={componentLoading}
          />
          <Group position={'center'}>
            <Button
              color={'orange'}
              type={'submit'}
              loading={componentLoading}
              leftIcon={<DeviceFloppy size={25} />}
            >
              Guardar Interacción
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateInteractionModal;
