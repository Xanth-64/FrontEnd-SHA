import {
  Center,
  Group,
  Table,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { ArrowDownCircle, ArrowUpCircle, Settings } from 'tabler-icons-react';

import axiosInstance from '../../lib/constants/axiosInstance';

import topic from '../../types/api_schemas/topic';

type Props = {
  topics: topic[];
  refetchData: () => void;
  updateTopic: (topic: topic) => void;
};

const TopicTable = ({ topics, refetchData, updateTopic }: Props) => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const mobile = width <= theme.breakpoints.md;
  const switchTopic = async (topic: topic, direction: 'up' | 'down') => {
    try {
      await axiosInstance.put('/topics/switch', {
        uuid: topic.id,
        move_direction: direction,
      });
      refetchData();
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <Table highlightOnHover>
      <thead>
        <tr>
          <th>
            {' '}
            <Text size={mobile ? 'xs' : 'lg'} weight={'bold'} align={'center'}>
              Nombre del Tópico
            </Text>
          </th>
          {!mobile ? (
            <th>
              {' '}
              <Text
                size={mobile ? 'xs' : 'lg'}
                weight={'bold'}
                align={'center'}
              >
                Fecha de Creación
              </Text>
            </th>
          ) : null}

          <th>
            {' '}
            <Text size={mobile ? 'xs' : 'lg'} weight={'bold'} align={'center'}>
              Configuración Adicional
            </Text>
          </th>
          <th>
            {' '}
            <Text size={mobile ? 'xs' : 'lg'} weight={'bold'} align={'center'}>
              Reordenar
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {topics.map((topic) => {
          return (
            <tr key={topic.id}>
              <td>
                <Text size={mobile ? 'xs' : 'lg'} align="center">
                  {topic.title}
                </Text>{' '}
              </td>
              {!mobile ? (
                <td>
                  <Text size={mobile ? 'xs' : 'lg'} align="center">
                    {topic.created_at}
                  </Text>
                </td>
              ) : null}
              <td>
                <Center>
                  <UnstyledButton
                    onClick={() => {
                      updateTopic(topic);
                    }}
                  >
                    <ThemeIcon variant="light" size="lg" color="orange">
                      <Settings size={mobile ? 26 : 36} />
                    </ThemeIcon>
                  </UnstyledButton>
                </Center>
              </td>
              <td>
                <Group noWrap position="center" spacing={mobile ? 'xs' : 'md'}>
                  <UnstyledButton
                    onClick={() => {
                      switchTopic(topic, 'up');
                    }}
                  >
                    <ThemeIcon variant="light" size="lg" color="gray">
                      <ArrowUpCircle size={mobile ? 26 : 30} />
                    </ThemeIcon>
                  </UnstyledButton>
                  <UnstyledButton
                    onClick={() => {
                      switchTopic(topic, 'down');
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

export default TopicTable;
