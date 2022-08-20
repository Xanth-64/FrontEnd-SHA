import {
  Table,
  useMantineTheme,
  Text,
  Center,
  UnstyledButton,
  ThemeIcon,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import precedenceTableProps from '../../types/component_schemas/precedenceTableProps';
import { Settings } from 'tabler-icons-react';

const PrecedenceTable = (props: precedenceTableProps) => {
  const { prelations, updatePrelation } = props;
  const { width } = useViewportSize();
  const theme = useMantineTheme();
  const mobile = width <= theme.breakpoints.md;
  return (
    <Table>
      <thead>
        <tr>
          <th>
            <Text size={mobile ? 'xs' : 'lg'} weight={'bold'} align={'center'}>
              Tópico Prelatorio
            </Text>
          </th>
          {!mobile ? (
            <th>
              <Text
                size={mobile ? 'xs' : 'lg'}
                weight={'bold'}
                align={'center'}
              >
                Grado de Prelación
              </Text>
            </th>
          ) : null}
          <th>
            <Text size={mobile ? 'xs' : 'lg'} weight={'bold'} align={'center'}>
              Tópico Objetivo
            </Text>
          </th>
          <th>
            <Text size={mobile ? 'xs' : 'lg'} weight={'bold'} align={'center'}>
              Configurar
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {prelations.map((prelation) => {
          return (
            <tr key={prelation.id}>
              <td>
                <Text size={mobile ? 'xs' : 'lg'} align="center">
                  {prelation.predecessor?.title}
                </Text>
              </td>
              {!mobile ? (
                <td>
                  <Text size={mobile ? 'xs' : 'lg'} align="center">
                    {prelation.knowledge_weight}
                  </Text>
                </td>
              ) : null}
              <td>
                <Text size={mobile ? 'xs' : 'lg'} align="center">
                  {prelation.successor?.title}
                </Text>
              </td>
              <td>
                <Center>
                  <UnstyledButton
                    onClick={() => {
                      updatePrelation(prelation);
                    }}
                  >
                    <ThemeIcon variant="light" size="lg" color="orange">
                      <Settings size={mobile ? 26 : 36} />
                    </ThemeIcon>
                  </UnstyledButton>
                </Center>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default PrecedenceTable;
