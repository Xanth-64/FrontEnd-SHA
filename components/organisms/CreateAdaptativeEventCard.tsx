import { Button, Card, Stack, Title, useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Plus } from 'tabler-icons-react';
import axiosInstance from '../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import adaptativeEvent from '../../types/api_schemas/adaptativeEvent';
import createAdaptativeEventCardProps from '../../types/component_schemas/createAdaptativeEventCardProps';
import AdaptativeEventTable from '../molecules/AdaptativeEventTable';
import CreateAdaptativeEventModal from '../molecules/CreateAdaptativeEventModal';
import CustomLoadingOverlay from '../overlays/CustomLoadingOverlay';

const CreateAdaptativeEventCard = ({
  adaptative_object_id,
  supported_adaptative_events,
  supported_adaptative_variables,
}: createAdaptativeEventCardProps) => {
  const [adaptativeEvents, setAdaptativeEvents] = useState<adaptativeEvent[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [displayUpdateModal, setDisplayUpdateModal] = useState<boolean>(false);
  const [currentAdaptativeEvent, setCurrentAdaptativeEvent] = useState<
    adaptativeEvent | undefined
  >(undefined);
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const mobile = width <= theme.breakpoints.md;
  const fetchAdaptativeEvents = () => {
    const inner_function = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          '/adaptative_event/by_adaptative_object/with_pagination',
          {
            params: {
              sort_key: 'relative_position',
              adaptative_object_id,
            },
          }
        );
        if (data.data.items) {
          setAdaptativeEvents(data.data.items);
        }
      } catch (error: any) {
        ShowFailedNotification(
          'Error recuperando los eventos adaptativos',
          'Ocurrió un error inesperado al intentar recuperar los eventos adaptativos. Por favor intente nuevamente.'
        );
      }
      setLoading(false);
    };
    inner_function();
  };
  useEffect(fetchAdaptativeEvents, [adaptative_object_id, displayUpdateModal]);
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <Title order={3}>Definir Reglas</Title>
        <CustomLoadingOverlay visible={loading} />
        <AdaptativeEventTable
          updateAdaptativeEvent={(adaptativeEvent) => {
            setCurrentAdaptativeEvent(adaptativeEvent);
            setDisplayUpdateModal(true);
          }}
          adaptativeEvents={adaptativeEvents}
          refetchData={fetchAdaptativeEvents}
        />
        <Stack align={'center'}>
          <Button
            color={'orange'}
            radius={'lg'}
            fullWidth={mobile}
            onClick={() => {
              setCurrentAdaptativeEvent(undefined);
              setDisplayUpdateModal(true);
            }}
            leftIcon={<Plus size={25} />}
          >
            Crear Evento Adaptativo
          </Button>
        </Stack>
      </Stack>
      <CreateAdaptativeEventModal
        onClose={() => {
          setDisplayUpdateModal(false);
          setCurrentAdaptativeEvent(undefined);
        }}
        opened={displayUpdateModal}
        adaptativeEventToUpdate={currentAdaptativeEvent}
        supported_adaptative_events={supported_adaptative_events}
        supported_adaptative_variables={supported_adaptative_variables}
        adaptativeObjectId={adaptative_object_id}
      />
    </Card>
  );
};

export default CreateAdaptativeEventCard;
