import instructorTableProps from '../../types/component_schemas/instructorTableProps';
import {
  Table,
  Text,
  useMantineTheme,
  ThemeIcon,
  Center,
  Group,
  UnstyledButton,
  Switch,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

const InstructorTable = ({
  instructors,
  toggleInstructor,
}: instructorTableProps) => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const mobile = width <= theme.breakpoints.md;

  return (
    <Table highlightOnHover>
      <thead>
        <tr>
          <th>
            <Text size={mobile ? 'xs' : 'lg'} weight={'bold'} align={'center'}>
              Correo Electrónico
            </Text>
          </th>
          {!mobile ? (
            <th>
              <Text
                size={mobile ? 'xs' : 'lg'}
                weight={'bold'}
                align={'center'}
              >
                Fecha de Ingreso
              </Text>
            </th>
          ) : null}
          <th>
            <Text size={mobile ? 'xs' : 'lg'} weight={'bold'} align={'center'}>
              Habilitado
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {instructors.map((instructor) => {
          return (
            <tr key={instructor.id}>
              <td>
                <Text
                  size={mobile ? 'xs' : 'lg'}
                  align="center"
                  style={
                    mobile
                      ? {
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          maxWidth: '80px',
                        }
                      : {
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                        }
                  }
                >
                  {instructor.email}
                </Text>
              </td>
              {!mobile ? (
                <td>
                  <Text
                    size={mobile ? 'xs' : 'lg'}
                    align="center"
                    style={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {instructor.created_at}
                  </Text>
                </td>
              ) : null}
              <td>
                {instructor.role ? (
                  <Center>
                    <Switch
                      color={'orange'}
                      size={mobile ? 'md' : 'xl'}
                      checked={
                        instructor.role.find(
                          (role) => role.role_name === 'teacher'
                        )?.is_enabled
                      }
                      onChange={() => {
                        toggleInstructor(instructor);
                      }}
                    />
                  </Center>
                ) : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
export default InstructorTable;
