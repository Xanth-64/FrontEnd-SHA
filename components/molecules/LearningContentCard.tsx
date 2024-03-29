import {
  Card,
  Group,
  HoverCard,
  Overlay,
  Skeleton,
  Stack,
  ThemeIcon,
  Title,
  Transition,
  TypographyStylesProvider,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Edit,
  MoodHappy,
  MoodSad,
  Trash,
} from 'tabler-icons-react';

import axiosInstance from '../../lib/constants/axiosInstance';
import useUser from '../../lib/hooks/useUser';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';
import mapAdaptativeEventStatus from '../../lib/utils/mapAdaptativeEventStatus';

import adaptativeEvent from '../../types/api_schemas/adaptativeEvent';
import learningContentCardProps from '../../types/component_schemas/learningContentCardProps';
import adaptativeEventStatus from '../../types/other_schemas/adaptativeEventStatus';

import CustomLoadingOverlay from '../overlays/CustomLoadingOverlay';
import MeasurableInteractionDetectionWrapper from '../overlays/MeasurableInteractionDetectionWrapper';

const LearningContentCard = ({
  page,
  updatePageList,
}: learningContentCardProps) => {
  const { user } = useUser();
  const role_name = user?.role[0].role_name;
  const { hovered, ref } = useHover();
  const router = useRouter();
  const [componentLoading, setComponentLoading] = useState<boolean>(false);
  const theme = useMantineTheme();
  const [adaptativeEvents, setAdaptativeEvents] = useState<adaptativeEvent[]>(
    []
  );
  const [adaptativeEventStatus, setAdaptativeEventStatus] =
    useState<adaptativeEventStatus>({});
  const [eventsLoading, setEventsLoading] = useState<boolean>(false);
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
  const fetchAdaptativeEvents = () => {
    const inner_function = async () => {
      if (page) {
        setEventsLoading(true);
        try {
          const { data } = await axiosInstance.get(
            `/pages/adaptative_events/triggered_events/${page.id}`
          );
          setAdaptativeEvents(data.data);
        } catch (error: any) {
          console.error(
            'Error found while retrieving Adaptative Events',
            error
          );
        }
        setEventsLoading(false);
      }
    };
    inner_function();
  };
  const updateAdaptativeEventStatus = () => {
    if (adaptativeEvents) {
      adaptativeEvents.forEach((adaptativeEv, index) => {
        switch (adaptativeEv.triggered_change) {
          case 'DISABLE':
            setAdaptativeEventStatus((currentStatus) => {
              return { ...currentStatus, disableTriggered: true };
            });
            break;
          case 'HIDE':
            setAdaptativeEventStatus((currentStatus) => {
              return { ...currentStatus, hideTriggered: true };
            });
            break;
          case 'HIGHLIGHT':
            setAdaptativeEventStatus((currentStatus) => {
              return { ...currentStatus, highlightTriggered: true };
            });
            break;
          case 'OBSCURE':
            setAdaptativeEventStatus((currentStatus) => {
              return { ...currentStatus, obscureTriggered: true };
            });
            break;
          case 'NOTIFY_NEGATIVE':
            if (!adaptativeEventStatus.notifyNegativeTriggered) {
              ShowFailedNotification(
                '¡Recomendación!',
                `Te recomendamos no dar mucha importancia al bloque "${page.learning_content?.title}" por los momentos.`
              );
            }
            setAdaptativeEventStatus((currentStatus) => {
              return { ...currentStatus, notifyNegativeTriggered: true };
            });
            break;
          case 'NOTIFY_POSITIVE':
            if (!adaptativeEventStatus.notifyPositiveTriggered) {
              ShowSuccessfullCreate(
                '¡Recomendación!',
                `Te recomendamos echarle un ojo al bloque "${page.learning_content?.title}". ¡Muy posiblemente sea de tu agrado!`
              );
            }
            setAdaptativeEventStatus((currentStatus) => {
              return { ...currentStatus, notifyPositiveTriggered: true };
            });
            break;
          default:
            break;
        }
        if (index === 0) {
          if (
            adaptativeEv.triggered_change === 'OBSCURE' ||
            adaptativeEv.triggered_change === 'DISABLE' ||
            adaptativeEv.triggered_change === 'HIDE' ||
            adaptativeEv.triggered_change === 'NOTIFY_NEGATIVE'
          ) {
            setAdaptativeEventStatus((currentStatus) => {
              return { ...currentStatus, firstInteractionType: 'NEGATIVE' };
            });
          } else {
            setAdaptativeEventStatus((currentStatus) => {
              return { ...currentStatus, firstInteractionType: 'POSITIVE' };
            });
          }
        }
      });
    }
  };
  useEffect(fetchAdaptativeEvents, [page]);
  useEffect(updateAdaptativeEventStatus, [adaptativeEvents]);
  return (
    <>
      {!mapAdaptativeEventStatus(adaptativeEventStatus).hideTriggered ||
      role_name === 'teacher' ? (
        <MeasurableInteractionDetectionWrapper
          learningContent={page.learning_content}
        >
          <Skeleton visible={eventsLoading}>
            <Card
              shadow={'sm'}
              radius={'md'}
              ref={ref}
              style={{
                padding: '36px 28px',
                backgroundColor: mapAdaptativeEventStatus(adaptativeEventStatus)
                  .highlightTriggered
                  ? theme.colors.orange[0]
                  : mapAdaptativeEventStatus(adaptativeEventStatus)
                      .obscureTriggered
                  ? theme.colors.gray[1]
                  : '',
                borderColor: mapAdaptativeEventStatus(adaptativeEventStatus)
                  .highlightTriggered
                  ? theme.colors.orange[3]
                  : mapAdaptativeEventStatus(adaptativeEventStatus)
                      .obscureTriggered
                  ? theme.colors.dark[3]
                  : '',
                borderWidth:
                  mapAdaptativeEventStatus(adaptativeEventStatus)
                    .highlightTriggered ||
                  mapAdaptativeEventStatus(adaptativeEventStatus)
                    .obscureTriggered
                    ? '2px'
                    : '1px',
              }}
            >
              {mapAdaptativeEventStatus(adaptativeEventStatus)
                .disableTriggered && role_name !== 'teacher' ? (
                <Overlay opacity={0.6} color="#000" blur={2} />
              ) : null}
              <CustomLoadingOverlay visible={componentLoading} />
              <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
                <Group position={'apart'}>
                  {mapAdaptativeEventStatus(adaptativeEventStatus)
                    .highlightTriggered ? (
                    <>
                      <HoverCard>
                        <HoverCard.Target>
                          <MoodHappy size={36} />
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                          ¡Contenido Recomendado!
                        </HoverCard.Dropdown>
                      </HoverCard>

                      <HoverCard>
                        <HoverCard.Target>
                          <MoodHappy size={36} />
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                          ¡Contenido Recomendado!
                        </HoverCard.Dropdown>
                      </HoverCard>
                    </>
                  ) : null}
                  {mapAdaptativeEventStatus(adaptativeEventStatus)
                    .obscureTriggered &&
                  !mapAdaptativeEventStatus(adaptativeEventStatus)
                    .disableTriggered ? (
                    <>
                      <HoverCard>
                        <HoverCard.Target>
                          <MoodSad size={36} />
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                          ¡Contenido No Recomendado!
                        </HoverCard.Dropdown>
                      </HoverCard>
                      <HoverCard>
                        <HoverCard.Target>
                          <MoodSad size={36} />
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                          ¡Contenido No Recomendado!
                        </HoverCard.Dropdown>
                      </HoverCard>
                    </>
                  ) : null}
                </Group>
                <Group position={'apart'}>
                  <Title order={3}>{page.learning_content?.title}</Title>
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
                              <ThemeIcon
                                color={'gray'}
                                variant={'light'}
                                size={'lg'}
                              >
                                <ArrowUp size={25} />
                              </ThemeIcon>
                            </UnstyledButton>
                            <UnstyledButton
                              onClick={() => {
                                switchPagePosition('down');
                              }}
                            >
                              <ThemeIcon
                                color={'gray'}
                                variant={'light'}
                                size={'lg'}
                              >
                                <ArrowDown size={25} />
                              </ThemeIcon>
                            </UnstyledButton>
                            <UnstyledButton onClick={deletePage}>
                              <ThemeIcon
                                color={'red'}
                                variant={'light'}
                                size={'lg'}
                              >
                                <Trash size={25} />
                              </ThemeIcon>
                            </UnstyledButton>
                            <UnstyledButton
                              onClick={() => {
                                router.push(
                                  `/teacher/learning_content/${page.learning_content?.id}`
                                );
                              }}
                            >
                              <ThemeIcon
                                color={'gray'}
                                variant={'light'}
                                size={'lg'}
                              >
                                <Edit size={25} />
                              </ThemeIcon>
                            </UnstyledButton>
                          </Group>
                        );
                      }}
                    </Transition>
                  ) : null}
                </Group>

                <TypographyStylesProvider>
                  {page.learning_content?.content ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: page.learning_content.content,
                      }}
                    />
                  ) : null}
                </TypographyStylesProvider>
              </Stack>
            </Card>
          </Skeleton>
        </MeasurableInteractionDetectionWrapper>
      ) : null}
    </>
  );
};

export default LearningContentCard;
