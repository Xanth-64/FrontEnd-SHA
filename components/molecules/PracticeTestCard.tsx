import {
  Card,
  Grid,
  Group,
  Stack,
  ThemeIcon,
  Text,
  Title,
  Transition,
  UnstyledButton,
  useMantineTheme,
  Button,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Edit,
  QuestionMark,
  Trash,
} from 'tabler-icons-react';
import axiosInstance from '../../lib/constants/axiosInstance';
import useUser from '../../lib/hooks/useUser';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';
import practiceTestCardProps from '../../types/component_schemas/practiceTestCardProps';
import CustomLoadingOverlay from '../overlays/CustomLoadingOverlay';

const PracticeTestCard = ({ page, updatePageList }: practiceTestCardProps) => {
  const { user } = useUser();
  const role_name = user?.role[0].role_name;
  const { hovered, ref } = useHover();
  const router = useRouter();
  const [componentLoading, setComponentLoading] = useState<boolean>(false);
  const theme = useMantineTheme();
  const deletePage = async () => {
    setComponentLoading(true);
    try {
      await axiosInstance.delete(`/pages/${page.id}`);
      ShowSuccessfullCreate(
        'Página eliminada exitosamente.',
        'La página ha sido eliminada exitosamente.'
      );
      updatePageList();
    } catch (error: any) {
      ShowFailedNotification(
        'Error inesperado.',
        'Un Error inesperado ocurrió al intentar eliminar la página. Por favor intente nuevamente.'
      );
    }
    setComponentLoading(false);
  };
  const switchPagePosition = async (move_direction: 'up' | 'down') => {
    setComponentLoading(true);
    try {
      await axiosInstance.put('/pages/switch', {
        uuid: page.id,
        move_direction: move_direction,
      });
      ShowSuccessfullCreate(
        'Posición de la página cambiada exitosamente.',
        'La posición de la página ha sido cambiada exitosamente.'
      );
      updatePageList();
    } catch (error: any) {
      if (error.response.data?.data?.error === 'NO_SWITCH_POSSIBLE') {
        ShowFailedNotification(
          'Error de intercambio.',
          'No se puede hacer un intercambio hacia la dirección especificada.'
        );
      } else {
        ShowFailedNotification(
          'Error inesperado.',
          'Un Error ocurrió al intentar cambiar la posición de la página.'
        );
      }
    }
    setComponentLoading(false);
  };
  return (
    <Card shadow={'sm'} radius={'md'} ref={ref}>
      <CustomLoadingOverlay visible={componentLoading} />
      <Stack spacing={'xl'}>
        <Group position={'apart'}>
          <Title order={3}>
            Prueba de Práctica: {page.practice_test?.title}
          </Title>
          {role_name === 'teacher' ? (
            <Transition mounted={hovered} transition={'fade'}>
              {(styles) => {
                return (
                  <Group position={'right'} style={styles}>
                    <UnstyledButton
                      onClick={() => {
                        switchPagePosition('up');
                      }}
                    >
                      <ThemeIcon color={'gray'} variant={'light'} size={'lg'}>
                        <ArrowUp size={25} />
                      </ThemeIcon>
                    </UnstyledButton>
                    <UnstyledButton
                      onClick={() => {
                        switchPagePosition('down');
                      }}
                    >
                      <ThemeIcon color={'gray'} variant={'light'} size={'lg'}>
                        <ArrowDown size={25} />
                      </ThemeIcon>
                    </UnstyledButton>
                    <UnstyledButton onClick={deletePage}>
                      <ThemeIcon color={'red'} variant={'light'} size={'lg'}>
                        <Trash size={25} />
                      </ThemeIcon>
                    </UnstyledButton>
                    <UnstyledButton
                      onClick={() => {
                        router.push(
                          `/teacher/practice_test/${page.practice_test?.id}`
                        );
                      }}
                    >
                      <ThemeIcon color={'gray'} variant={'light'} size={'lg'}>
                        <Edit size={25} />
                      </ThemeIcon>
                    </UnstyledButton>
                  </Group>
                );
              }}
            </Transition>
          ) : null}
        </Group>
        <Card withBorder style={{ backgroundColor: theme.colors.orange[0] }}>
          <Stack align={'center'}>
            <Button
              color={'orange'}
              leftIcon={<QuestionMark size={25} />}
              rightIcon={<QuestionMark size={25} />}
              onClick={() => {
                router.push(`/student/test/${page.practice_test?.id}`);
              }}
            >
              Presentar Prueba
            </Button>
            <Text size="sm" mt={7} align={'center'}>
              Cantidad de Preguntas:{' '}
              {page.practice_test?.test_questions?.length}
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Card>
  );
};

export default PracticeTestCard;
