import {
  Card,
  Group,
  Modal,
  Stack,
  Select,
  Slider,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
  useMantineTheme,
  Button,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { Plus, X } from 'tabler-icons-react';
import axiosInstance from '../../lib/constants/axiosInstance';
import mapEventNames from '../../lib/utils/mapEventNames';
import mapEventVariableNames from '../../lib/utils/mapEventVariableNames';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';
import AdaptativeEventSchema from '../../schemas/AdaptativeEventSchema';
import createAdaptativeEventModalProps from '../../types/component_schemas/createAdaptativeEventModalProps';

const CreateAdaptativeEventModal = ({
  adaptativeEventToUpdate,
  adaptativeObjectId,
  supported_adaptative_events,
  supported_adaptative_variables,
  ...modalProps
}: createAdaptativeEventModalProps) => {
  const theme = useMantineTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    validate: zodResolver(AdaptativeEventSchema),
    initialValues: {
      triggered_change: adaptativeEventToUpdate
        ? adaptativeEventToUpdate.triggered_change
        : 'HIGHLIGHT',
      condition_aggregator: adaptativeEventToUpdate
        ? adaptativeEventToUpdate.condition_aggregator
        : 'OR',
      adaptation_conditions: adaptativeEventToUpdate
        ? adaptativeEventToUpdate.adaptation_conditions
        : [],
    },
  });
  useEffect(() => {
    form.setValues({
      triggered_change: adaptativeEventToUpdate
        ? adaptativeEventToUpdate.triggered_change
        : 'HIGHLIGHT',
      condition_aggregator: adaptativeEventToUpdate
        ? adaptativeEventToUpdate.condition_aggregator
        : 'OR',
      adaptation_conditions: adaptativeEventToUpdate
        ? adaptativeEventToUpdate.adaptation_conditions
        : [],
    });
  }, [adaptativeEventToUpdate]);
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
            await axiosInstance.post('/adaptative_event/', {
              ...values,
              adaptative_object_id: adaptativeObjectId,
            });
            modalProps.onClose();
            ShowSuccessfullCreate(
              'Evento adaptativo creado exitosamente',
              'Se ha creado el evento adaptativo de manera exitosa.'
            );
            form.reset();
          } catch (error: any) {
            ShowFailedNotification(
              'Error Inesperado.',
              'Ocurrió un error inesperado al intentar crear el evento adaptativo. Por favor intente nuevamente.'
            );
            modalProps.onClose();
          }
          setLoading(false);
        })}
      >
        <Stack spacing={'xl'} style={{ padding: '36 28' }}>
          <Title order={3}>Configuración de Evento Adaptativo</Title>
          <Select
            data={supported_adaptative_events.map((value) => {
              return { value, label: mapEventNames(value) };
            })}
            searchable
            label={'Cambio a Producir'}
            {...form.getInputProps('triggered_change')}
            disabled={loading}
            withinPortal
          />
          <Select
            data={[
              {
                label: '"O" Condicional',
                value: 'OR',
              },
              {
                label: '"Y" Condicional',
                value: 'AND',
              },
            ]}
            searchable
            label={'Agregador Condicional'}
            {...form.getInputProps('condition_aggregator')}
            disabled={loading}
            withinPortal
          />
          <Group spacing={'lg'}>
            <Text weight="bold" size="sm">
              Condiciones de Adaptación
            </Text>
            <UnstyledButton
              onClick={() => {
                form.insertListItem('adaptation_conditions', {
                  variable_to_compare: supported_adaptative_variables[0],
                  comparation_condition: 'lte',
                  value_to_compare: 50,
                });
              }}
            >
              <ThemeIcon variant={'light'} color={'orange'}>
                <Plus size={18} />
              </ThemeIcon>
            </UnstyledButton>
          </Group>
          <Stack spacing={'xl'}>
            {form.values.adaptation_conditions.map(
              (adaptationCondition: any, conditionIndex: number) => {
                return (
                  <Card withBorder key={conditionIndex}>
                    <Stack spacing={'md'} style={{ padding: '36 28' }}>
                      <Group position={'apart'}>
                        <Title order={4}>Condición {conditionIndex + 1}</Title>
                        <X
                          size={15}
                          color={theme.colors.gray[7]}
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            form.removeListItem(
                              'adaptation_conditions',
                              conditionIndex
                            );
                          }}
                        />
                      </Group>
                      <Select
                        data={supported_adaptative_variables.map((value) => {
                          return {
                            value,
                            label: mapEventVariableNames(value),
                          };
                        })}
                        searchable
                        label={'Variable a Comparar'}
                        {...form.getInputProps(
                          `adaptation_conditions.${conditionIndex}.variable_to_compare`
                        )}
                        disabled={loading}
                        withinPortal
                      />
                      <Text weight="bold" size="md">
                        Valor a Comparar
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
                        value={
                          form.values.adaptation_conditions[conditionIndex]
                            .value_to_compare
                        }
                        onChange={(value) => {
                          form.setFieldValue(
                            `adaptation_conditions.${conditionIndex}.value_to_compare`,
                            value
                          );
                        }}
                        disabled={loading}
                      />
                      <Select
                        data={[
                          {
                            label: 'Mayor o Igual Que',
                            value: 'gte',
                          },
                          {
                            label: 'Menor o Igual Que',
                            value: 'lte',
                          },
                        ]}
                        searchable
                        label={'Operador de Comparación'}
                        {...form.getInputProps(
                          `adaptation_conditions.${conditionIndex}.comparation_condition`
                        )}
                        disabled={loading}
                        withinPortal
                      />
                    </Stack>
                  </Card>
                );
              }
            )}
          </Stack>
          <Group position={'center'}>
            <Button color={'orange'} type={'submit'} loading={loading}>
              Crear Evento Adaptativo
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateAdaptativeEventModal;
