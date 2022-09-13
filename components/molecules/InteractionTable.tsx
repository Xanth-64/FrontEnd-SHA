import {
  Center,
  Menu,
  Table,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { Adjustments, Settings, Trash } from 'tabler-icons-react';
import axiosInstance from '../../lib/constants/axiosInstance';
import mapInteractionTriggers from '../../lib/utils/mapInteractionTriggers';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';
import measurableInteraction from '../../types/api_schemas/measurableInteraction';
import interactionTableProps from '../../types/component_schemas/interactionTableProps';

const InteractionTable = ({
  measurableInteractions,
  refetchData,
  updateMeasurableInteraction,
}: interactionTableProps) => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const mobile = width <= theme.breakpoints.md;
  const deleteMeasurableInteraction = async (
    measurableInteraction: measurableInteraction
  ) => {
    try {
      await axiosInstance.delete(
        `/measurable_interaction/${measurableInteraction.id}`
      );
      refetchData();
      ShowSuccessfullCreate(
        'Interacción Eliminada',
        'Interacción eliminada exitosamente.'
      );
    } catch (error: any) {
      ShowFailedNotification(
        'Error al Eliminar',
        'No se pudo eliminar la interacción. Intente nuevamente.'
      );
    }
  };
  return (
    <Table highlightOnHover>
      <thead>
        <tr>
          <th>
            <Text size={mobile ? 'xs' : 'lg'} weight={'bold'} align={'center'}>
              Tipo de Interacción
            </Text>
          </th>
          <th>
            <Text size={mobile ? 'xs' : 'lg'} weight={'bold'} align={'center'}>
              Ponderación
            </Text>
          </th>
          <th>
            <Text size={mobile ? 'xs' : 'lg'} weight={'bold'} align={'center'}>
              Ver Detalle
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {measurableInteractions.map((measurableInteraction) => {
          return (
            <tr key={measurableInteraction.id}>
              <td>
                <Text size={mobile ? 'xs' : 'lg'} align={'center'}>
                  {mapInteractionTriggers(
                    measurableInteraction.interaction_trigger
                  )}
                </Text>
              </td>
              <td>
                <Text size={mobile ? 'xs' : 'lg'} align={'center'}>
                  {measurableInteraction.interaction_weight}
                </Text>
              </td>
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
                      <Menu.Item
                        onClick={() => {
                          updateMeasurableInteraction(measurableInteraction);
                        }}
                        icon={<Adjustments size={18} />}
                      >
                        Modificar
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          deleteMeasurableInteraction(measurableInteraction);
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
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default InteractionTable;
