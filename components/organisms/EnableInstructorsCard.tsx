import {
  Card,
  Title,
  Stack,
  Group,
  Pagination,
  useMantineTheme,
  Select,
  Text,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import axiosInstance from '../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import user from '../../types/api_schemas/user';
import InstructorTable from '../molecules/InstructorTable';
import CustomLoadingOverlay from '../overlays/CustomLoadingOverlay';

const EnableInstructorsCard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const mobile = width <= theme.breakpoints.md;
  const [pageSize, setPageSize] = useState<string>('10');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [instructors, setInstructors] = useState<user[]>([]);
  const fetch_instructors = () => {
    const inner_function = async () => {
      try {
        const response = await axiosInstance.get('/users/with_pagination', {
          params: {
            page: page,
            page_size: pageSize,
            sort_key: 'created_at',
            user_type: 'teacher',
          },
        });
        setTotalPages(
          response.data.data.total_pages ? response.data.data.total_pages : 1
        );
        setPage(page <= totalPages ? page : 1);
        setInstructors(response.data.data.items);
      } catch (error: any) {}
    };
    setLoading(true);
    inner_function();
    setLoading(false);
  };
  const toggleInstructor = async (instructor: user) => {
    setLoading(true);
    try {
      const role = instructor.role?.find(
        (role) => role.role_name === 'teacher'
      );
      if (role) {
        await axiosInstance.post('/users/enable_role', {
          user_id: instructor.id,
          role_name: 'teacher',
          role_value: !role.is_enabled,
        });
      }
    } catch (error: any) {
      ShowFailedNotification(
        'Error al momento de actualizar al usuario',
        'Ocurrió un error al momento de intentar habilitar/deshabilitar al usuario'
      );
    } finally {
      fetch_instructors();
    }
    setLoading(false);
  };
  useEffect(fetch_instructors, [page, pageSize]);
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <CustomLoadingOverlay visible={loading} />
        <Group grow position={'apart'}>
          {!mobile ? <Title order={3}>Habilitar Instructores</Title> : null}
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
            Cantidad de Instructores a Mostrar
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
        <InstructorTable
          instructors={instructors}
          toggleInstructor={toggleInstructor}
        />
      </Stack>
    </Card>
  );
};

export default EnableInstructorsCard;
