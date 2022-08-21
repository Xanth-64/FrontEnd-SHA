import {
  Card,
  Title,
  Stack,
  useMantineTheme,
  Group,
  Button,
  Pagination,
  Text,
  Select,
} from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import { useViewportSize } from '@mantine/hooks';
import createTemplateCardProps from '../../types/component_schemas/createTemplateCardProps';
import { useState, useEffect } from 'react';
import CustomLoadingOverlay from '../overlays/CustomLoadingOverlay';
import topic from '../../types/api_schemas/topic';
import axiosInstance from '../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import TemplateTable from '../molecules/TemplateTable';
import template from '../../types/api_schemas/template';
import CreateTemplateModal from '../molecules/CreateTemplateModal';

const CreateTemplateCard = ({ topic }: createTemplateCardProps) => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const mobile = width <= theme.breakpoints.md;
  const [pageSize, setPageSize] = useState<string>('10');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<topic | undefined>(
    undefined
  );
  const [templateToUpdate, setTemplateToUpdate] = useState<
    template | undefined
  >(undefined);
  const [templates, setCurrentTemplates] = useState<template[]>([]);
  const displayUpdateModal = (template: template) => {
    setTemplateToUpdate(template);
    setShowModal(true);
  };
  const fetchTemplates = () => {
    const inner_function = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/templates/with_pagination', {
          params: {
            page: page,
            page_size: pageSize,
            sort_key: 'relative_position',
            topic_id: topic,
          },
        });
        setCurrentTemplates(response.data.data.items);
        setTotalPages(response.data.data.total_pages);
        setPage(page <= response.data.data.total_pages ? page : 1);
      } catch (error: any) {
        ShowFailedNotification(
          'Error recuperando los templates',
          'Ocurrió un error al recuperar los templates. Por favor, intente nuevamente.'
        );
      }
      setLoading(false);
    };

    inner_function();
  };
  useEffect(fetchTemplates, [page, pageSize, showModal, topic]);
  useEffect(() => {
    const inner_function = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/topics/${topic}`);
        setCurrentTopic(response.data.data);
      } catch (error: any) {
        ShowFailedNotification(
          'Error recuperando tópico.',
          'Ocurrió un error al recuperar el tópico. Por favor, intente nuevamente.'
        );
      }
      setLoading(false);
    };
    inner_function();
  }, [topic]);
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <CustomLoadingOverlay visible={loading} />
        <Group grow position={'apart'}>
          {!mobile ? <Title order={3}>{currentTopic?.title}</Title> : null}
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
            Cantidad de Templates a Mostrar
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
        <Stack align={'center'}>
          <TemplateTable
            updateTemplate={displayUpdateModal}
            templates={templates}
            refetchData={fetchTemplates}
          />
          <Button
            color={'orange'}
            radius={'lg'}
            fullWidth={mobile}
            onClick={() => {
              setShowModal(true);
            }}
            leftIcon={<Plus size={25} />}
          >
            Crear Template
          </Button>
        </Stack>
      </Stack>
      <CreateTemplateModal
        opened={showModal}
        templateToUpdate={templateToUpdate}
        topicId={topic}
        onClose={() => {
          setShowModal(false);
          setTemplateToUpdate(undefined);
        }}
      />
    </Card>
  );
};

export default CreateTemplateCard;
