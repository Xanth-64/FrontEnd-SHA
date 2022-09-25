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
import { useRouter } from 'next/router';
import {
  Adjustments,
  ArrowDownCircle,
  ArrowUpCircle,
  ListDetails,
  Settings,
} from 'tabler-icons-react';

import axiosInstance from '../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';

import template from '../../types/api_schemas/template';
import templateTableProps from '../../types/component_schemas/templateTableProps';

const TemplateTable = ({
  templates,
  refetchData,
  updateTemplate,
}: templateTableProps) => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const router = useRouter();
  const mobile = width <= theme.breakpoints.md;
  const switchTemplate = async (
    template: template,
    direction: 'up' | 'down'
  ) => {
    try {
      await axiosInstance.put('/templates/switch', {
        uuid: template.id,
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
              Nombre del Template
            </Text>
          </th>
          {!mobile ? (
            <th>
              <Text
                size={mobile ? 'xs' : 'lg'}
                weight={'bold'}
                align={'center'}
              >
                Ponderación
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
        {templates.map((template) => {
          return (
            <tr key={template.id}>
              <td>
                <Text size={mobile ? 'xs' : 'lg'} align="center">
                  {template.title}
                </Text>
              </td>
              {!mobile ? (
                <td>
                  <Text size={mobile ? 'xs' : 'lg'} align="center">
                    {template.knowledge_weight}
                  </Text>
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
                      <Menu.Item
                        onClick={() => {
                          updateTemplate(template);
                        }}
                        icon={<Adjustments size={18} />}
                      >
                        Modificación Rápida
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          router.push(`/teacher/templates/${template.id}`);
                        }}
                        icon={<ListDetails size={18} />}
                      >
                        Ver Detalle
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Center>
              </td>
              <td>
                <Group noWrap position="center" spacing={mobile ? 'xs' : 'md'}>
                  <UnstyledButton
                    onClick={() => {
                      switchTemplate(template, 'up');
                    }}
                  >
                    <ThemeIcon variant="light" size="lg" color="gray">
                      <ArrowUpCircle size={mobile ? 26 : 30} />
                    </ThemeIcon>
                  </UnstyledButton>
                  <UnstyledButton
                    onClick={() => {
                      switchTemplate(template, 'down');
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

export default TemplateTable;
