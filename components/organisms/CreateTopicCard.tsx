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

import topic from '../../types/api_schemas/topic';

import CustomLoadingOverlay from '../overlays/CustomLoadingOverlay';

import CreateTopicModal from '../molecules/CreateTopicModal';
import TopicTable from '../molecules/TopicTable';

const CreateTopicCard = () => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const mobile = width <= theme.breakpoints.md;
  const [pageSize, setPageSize] = useState<string>('10');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState<topic[]>([]);
  const [topicToUpdate, setTopicToUpdate] = useState<topic | undefined>(
    undefined
  );

  const fetch_topics = async () => {
    try {
      setLoading(true);
      const data = await axiosInstance.get('/topics/with_pagination', {
        params: {
          page: page,
          page_size: pageSize,
          sort_key: 'relative_position',
        },
      });
      setTopics(data.data.data.items);
      setTotalPages(
        data.data.data.total_pages ? data.data.data.total_pages : 1
      );
    } finally {
      setLoading(false);
    }
  };

  const displayUpdateModal = (topic: topic) => {
    setTopicToUpdate(topic);
    setShowModal(true);
  };
  useEffect(() => {
    fetch_topics();
  }, [page, pageSize, showModal]);
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <CustomLoadingOverlay visible={loading} />
        <Group grow position={'apart'}>
          {!mobile ? <Title order={3}>Tópicos de Conocimiento</Title> : null}
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
            Cantidad de Tópicos a Mostrar
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
        <TopicTable
          updateTopic={displayUpdateModal}
          topics={topics}
          refetchData={fetch_topics}
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
            Crear Tópico
          </Button>
        </Stack>
      </Stack>
      <CreateTopicModal
        opened={showModal}
        size={'xl'}
        onClose={() => {
          setShowModal(false);
          setTopicToUpdate(undefined);
        }}
        overlayBlur={4}
        padding={'xl'}
        centered
        topicToUpdate={topicToUpdate}
      />
    </Card>
  );
};

export default CreateTopicCard;
