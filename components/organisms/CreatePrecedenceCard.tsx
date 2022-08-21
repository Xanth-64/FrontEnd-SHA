import {
  Card,
  Title,
  Stack,
  Group,
  Pagination,
  useMantineTheme,
  Text,
  Select,
  Button,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useViewportSize } from '@mantine/hooks';
import { Plus } from 'tabler-icons-react';
import PrecedenceTable from '../molecules/PrecedenceTable';
import CreatePrecedenceModal from '../molecules/CreatePrecedenceModal';
import prelation from '../../types/api_schemas/prelation';
import axiosInstance from '../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import CustomLoadingOverlay from '../overlays/CustomLoadingOverlay';
const CreatePrecedenceCard = ({
  updatePrecedenceGraph,
}: {
  updatePrecedenceGraph: () => void;
}) => {
  const [pageSize, setPageSize] = useState<string>('10');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [prelationToUpdate, setPrelationToUpdate] = useState<
    prelation | undefined
  >(undefined);
  const [prelations, setPrelations] = useState<prelation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const mobile = width <= theme.breakpoints.md;
  const fetch_prelations = () => {
    const inner_function = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          '/topics/prelations/with_pagination',
          {
            params: {
              page: page,
              page_size: pageSize,
            },
          }
        );
        setTotalPages(
          response.data.data.total_pages ? response.data.data.total_pages : 1
        );
        setPage(page <= response.data.data.total_pages ? page : 1);
        setPrelations(response.data.data.items);
      } catch (error: any) {
        ShowFailedNotification(
          'Error recuperando la información.',
          'No se pudieron cargar las relaciones de precedencia. Por favor, intente de nuevo.'
        );
      } finally {
        setLoading(false);
      }
    };
    inner_function();
  };
  const displayUpdateModal = (prelation: prelation) => {
    setPrelationToUpdate(prelation);
    setShowModal(true);
  };
  useEffect(fetch_prelations, [page, pageSize, showModal]);
  useEffect(updatePrecedenceGraph, [page, pageSize, showModal]);

  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <CustomLoadingOverlay visible={loading} />
        <Group grow position={'apart'}>
          {!mobile ? <Title order={3}>Prelaciones Generadas</Title> : null}
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
            Cantidad de Prelaciones a Mostrar
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
        <PrecedenceTable
          updatePrelation={displayUpdateModal}
          prelations={prelations}
        />
        <Stack align={'center'}>
          <Button
            color={'orange'}
            radius={'lg'}
            fullWidth={mobile}
            onClick={() => {
              setShowModal(true);
            }}
            leftIcon={<Plus size={25} />}
          >
            Crear Prelación
          </Button>
        </Stack>
      </Stack>
      <CreatePrecedenceModal
        opened={showModal}
        size={'xl'}
        withCloseButton={false}
        onClose={() => {
          setShowModal(false);
          setPrelationToUpdate(undefined);
        }}
        overlayBlur={4}
        padding={'xl'}
        centered
        prelationToUpdate={prelationToUpdate}
      />
    </Card>
  );
};

export default CreatePrecedenceCard;
