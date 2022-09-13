import {
  Center,
  Group,
  Menu,
  Table,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Settings,
  Trash,
} from 'tabler-icons-react';
import axiosInstance from '../../lib/constants/axiosInstance';
import mapEventNames from '../../lib/utils/mapEventNames';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';
import adaptativeEvent from '../../types/api_schemas/adaptativeEvent';
import adaptativeEventTableProps from '../../types/component_schemas/adaptativeEventTableProps';

const AdaptativeEventTable = ({
  adaptativeEvents,
  refetchData,
  updateAdaptativeEvent,
}: adaptativeEventTableProps) => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const mobile = width <= theme.breakpoints.md;
  const deleteAdaptativeEvent = async (event: adaptativeEvent) => {
    try {
      await axiosInstance.delete(`/adaptative_event/${event.id}`);
      refetchData();
      ShowSuccessfullCreate(
        'Evento Eliminado',
        'Evento eliminado exitosamente.'
      );
    } catch (error: any) {
      ShowFailedNotification(
        'Error al Eliminar',
        'No se pudo eliminar el evento. Intente nuevamente.'
      );
    }
  };
  const switchAdaptativeEvent = async (
    event: adaptativeEvent,
    direction: 'up' | 'down'
  ) => {
    try {
      await axiosInstance.put('/adaptative_event/switch', {
        uuid: event.id,
        move_direction: direction,
      });
      refetchData();
    } catch (error: any) {
      if (error.response) {
        if (error.response.data?.data?.error === 'NO_SWITCH_POSSIBLE') {
          ShowFailedNotification(
            'Error de intercambio.',
            'No se puede hacer un intercambio hacia la dirección especificada.'
          );
        }
      }
    }
  };
  return (
    <Table highlightOnHover>
      <thead>
        <tr>
          <th>
            <Text size={mobile ? 'xs' : 'lg'} weight={'bold'} align={'center'}>
              Cambio a Producir
            </Text>
          </th>
          {!mobile ? (
            <th>
              <Text
                size={mobile ? 'xs' : 'lg'}
                weight={'bold'}
                align={'center'}
              >
                Agregador Condicional
              </Text>
            </th>
          ) : null}
          <th>
            <Text size={mobile ? 'xs' : 'lg'} weight={'bold'} align={'center'}>
              Ver Detalle
            </Text>
          </th>
          <th>
            <Text size={mobile ? 'xs' : 'lg'} weight={'bold'} align={'center'}>
              Reordenar
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {adaptativeEvents?.map((adaptativeEvent) => {
          return (
            <tr key={adaptativeEvent.id}>
              <td>
                <Text size={mobile ? 'xs' : 'lg'} align={'center'}>
                  {mapEventNames(adaptativeEvent.triggered_change)}
                </Text>
              </td>
              {!mobile ? (
                <td>
                  <Center>
                    <Text
                      size={mobile ? 'xs' : 'lg'}
                      weight={'bold'}
                      align={'center'}
                    >
                      {adaptativeEvent.condition_aggregator}
                    </Text>
                  </Center>
                </td>
              ) : null}
              <td>
                <Center>
                  <Menu loop>
                    <Menu.Target>
                      <UnstyledButton>
                        <ThemeIcon variant="light" size="lg" color="orange">
                          <Settings size={mobile ? 26 : 36} />
                        </ThemeIcon>
                      </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {/* <Menu.Item
                        onClick={() => {
                          updateAdaptativeEvent(adaptativeEvent);
                        }}
                        icon={<Adjustments size={18} />}
                      >
                        Modificar
                      </Menu.Item> */}
                      <Menu.Item
                        onClick={() => {
                          deleteAdaptativeEvent(adaptativeEvent);
                        }}
                        icon={<Trash size={18} />}
                        color={'red'}
                      >
                        Eliminar
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Center>
              </td>
              <td>
                <Group noWrap position="center" spacing={mobile ? 'xs' : 'md'}>
                  <UnstyledButton
                    onClick={() => {
                      switchAdaptativeEvent(adaptativeEvent, 'up');
                    }}
                  >
                    <ThemeIcon variant="light" size="lg" color="gray">
                      <ArrowUpCircle size={mobile ? 26 : 30} />
                    </ThemeIcon>
                  </UnstyledButton>
                  <UnstyledButton
                    onClick={() => {
                      switchAdaptativeEvent(adaptativeEvent, 'down');
                    }}
                  >
                    <ThemeIcon variant="light" size="lg" color="gray">
                      <ArrowDownCircle size={mobile ? 26 : 30} />
                    </ThemeIcon>
                  </UnstyledButton>
                </Group>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default AdaptativeEventTable;
