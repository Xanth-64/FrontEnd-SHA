import {
  Button,
  Card,
  Group,
  Pagination,
  Select,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Plus } from 'tabler-icons-react';

import axiosInstance from '../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';

import measurableInteraction from '../../types/api_schemas/measurableInteraction';
import pageInteractionsCardProps from '../../types/component_schemas/pageInteractionsCardProps';

import CustomLoadingOverlay from '../overlays/CustomLoadingOverlay';

import CreateInteractionModal from '../molecules/CreateInteractionModal';
import InteractionTable from '../molecules/InteractionTable';

const PageInteractionsCard = ({
  currentLearningContent,
  loading,
  fetchLearningContent,
}: pageInteractionsCardProps) => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const mobile = width <= theme.breakpoints.md;
  const [componentLoading, setComponentLoading] = useState(true);
  const [measurableInteractions, setMeasurableInteractions] = useState<
    measurableInteraction[]
  >([]);
  const [currentMeasurableInteraction, setCurrentMeasurableInteraction] =
    useState<measurableInteraction | undefined>(undefined);
  const [pageSize, setPageSize] = useState<string>('10');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const fetchMeasurableInteractions = () => {
    const inner_function = async () => {
      setComponentLoading(true);
      try {
        if (currentLearningContent) {
          const { data } = await axiosInstance(
            '/measurable_interaction/by_learning_content/with_pagination',
            {
              params: {
                page: page,
                page_size: pageSize,
                learning_content_id: currentLearningContent?.id,
              },
            }
          );
          setMeasurableInteractions(data.data.items);
          setTotalPages(data.data.total_pages ? data.data.total_pages : 1);
          setPage(data.data.total_pages <= page ? page : 1);
        }
      } catch (error: any) {
        ShowFailedNotification(
          'Error Inesperado.',
          'Ocurrió un error inesperado al intentar recuperar las interacciones. Por favor intente nuevamente.'
        );
      }
      setComponentLoading(false);
    };
    inner_function();
  };
  useEffect(fetchMeasurableInteractions, [
    currentLearningContent,
    page,
    pageSize,
    showModal,
  ]);
  return (
    <Card shadow={'sm'} radius={'md'}>
      <CustomLoadingOverlay visible={componentLoading} />
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <CustomLoadingOverlay visible={loading} />
        <Group grow position={'apart'}>
          {!mobile ? <Title order={3}>Definir Interacciones</Title> : null}
          <Pagination
            total={totalPages}
            color={'orange'}
            siblings={1}
            radius="md"
            withControls={true}
            withEdges={!mobile}
            boundaries={0}
            position={mobile ? 'center' : 'right'}
            page={page}
            onChange={setPage}
          />
        </Group>
        <Stack align={mobile ? 'center' : 'flex-start'}>
          <Text size={'md'} weight={'bold'}>
            Cantidad de Interacciones a Mostrar
          </Text>
          <Select
            allowDeselect={false}
            size={'md'}
            style={{ width: '50%' }}
            data={[
              { value: '10', label: '10' },
              { value: '50', label: '50' },
              { value: '100', label: '100' },
            ]}
            dropdownPosition={'bottom'}
            withinPortal
            value={pageSize}
            onChange={(new_value: string) => {
              setPage(1);
              setPageSize(new_value);
            }}
          />
        </Stack>
        <InteractionTable
          measurableInteractions={measurableInteractions}
          refetchData={fetchMeasurableInteractions}
          updateMeasurableInteraction={(interaction) => {
            setCurrentMeasurableInteraction(interaction);
            setShowModal(true);
          }}
        />
        <Stack align={'center'}>
          <Button
            color={'orange'}
            radius={'lg'}
            fullWidth={mobile}
            onClick={() => {
              setCurrentMeasurableInteraction(undefined);
              setShowModal(true);
            }}
            leftIcon={<Plus size={25} />}
          >
            Crear Interacción
          </Button>
        </Stack>
        <CreateInteractionModal
          opened={showModal}
          interactionToUpdate={currentMeasurableInteraction}
          learningContentId={currentLearningContent?.id}
          onClose={() => {
            setShowModal(false);
            setCurrentMeasurableInteraction(undefined);
          }}
          size={'xl'}
          overlayBlur={4}
          padding={'xl'}
          centered
        />
      </Stack>
    </Card>
  );
};

export default PageInteractionsCard;
