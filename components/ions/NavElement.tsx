import {
  Box,
  Grid,
  HoverCard,
  LoadingOverlay,
  Overlay,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ExternalLinkOff, MoodHappy, MoodSad } from 'tabler-icons-react';
import axiosInstance from '../../lib/constants/axiosInstance';
import { useNavbarContext } from '../../lib/contexts/NavbarContext';
import mapAdaptativeEventStatus from '../../lib/utils/mapAdaptativeEventStatus';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import adaptativeEvent from '../../types/api_schemas/adaptativeEvent';
import navElement from '../../types/component_schemas/navElement';
import adaptativeEventStatus from '../../types/other_schemas/adaptativeEventStatus';

const NavElement = (element: navElement) => {
  const router = useRouter();
  const mantineTheme = useMantineTheme();
  const { displayNavbar, toggleDisplay } = useNavbarContext();
  const [adaptativeEvents, setAdaptativeEvents] = useState<adaptativeEvent[]>(
    []
  );
  const [adaptativeEventStatus, setAdaptativeEventStatus] =
    useState<adaptativeEventStatus>({});
  const fetchAdaptativeEvents = () => {
    const inner_function = async () => {
      if (element.topic_id) {
        try {
          const { data } = await axiosInstance.get(
            `/topics/adaptative_events/triggered_events/${element.topic_id}`
          );
          setAdaptativeEvents(data.data);
        } catch (error: any) {
          console.error(
            'Error found while retrieving Adaptative Events',
            error
          );
        }
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
          default:
            break;
        }
        if (index === 0) {
          if (
            adaptativeEv.triggered_change === 'OBSCURE' ||
            adaptativeEv.triggered_change === 'DISABLE' ||
            adaptativeEv.triggered_change === 'HIDE'
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
  useEffect(fetchAdaptativeEvents, [element]);
  useEffect(updateAdaptativeEventStatus, [adaptativeEvents]);

  return (
    <>
      {mapAdaptativeEventStatus(adaptativeEventStatus).hideTriggered ? null : (
        <Grid
          align="center"
          gutter={10}
          onClick={() => {
            if (
              mapAdaptativeEventStatus(adaptativeEventStatus).disableTriggered
            ) {
              ShowFailedNotification(
                '¡No puede acceder a este Tópico!',
                'Todavía no puede acceder a este tópico. Explore la plataforma y vuelva más tarde.'
              );
              return;
            }
            if (element.link) {
              router.push(element.link);
              if (displayNavbar) {
                toggleDisplay();
              }
            }
          }}
          style={{
            height: '56px',
            cursor: 'pointer',
            backgroundColor: mapAdaptativeEventStatus(adaptativeEventStatus)
              .highlightTriggered
              ? mantineTheme.colors.orange[1]
              : mapAdaptativeEventStatus(adaptativeEventStatus).obscureTriggered
              ? mantineTheme.colors.dark[0]
              : '',
          }}
          sx={(theme) => {
            return {
              transition: 'background-color 0.25s ease-in-out',
              '&:hover': {
                backgroundColor: theme.colors.gray[1],
              },
            };
          }}
        >
          <Grid.Col span={2}>
            <ThemeIcon
              color={element?.color}
              variant="light"
              size={'lg'}
              radius="sm"
            >
              {element.icon ?? null}
            </ThemeIcon>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text
              size="md"
              weight={500}
              color={
                mapAdaptativeEventStatus(adaptativeEventStatus).disableTriggered
                  ? 'dimmed'
                  : 'dark'
              }
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '25ch',
              }}
            >
              {element.title}
            </Text>
          </Grid.Col>
          <Grid.Col span={2}>
            {mapAdaptativeEventStatus(adaptativeEventStatus)
              .highlightTriggered ? (
              <MoodHappy size={24} />
            ) : null}
            {mapAdaptativeEventStatus(adaptativeEventStatus)
              .disableTriggered ? (
              <ExternalLinkOff size={24} />
            ) : null}
            {mapAdaptativeEventStatus(adaptativeEventStatus).obscureTriggered &&
            !mapAdaptativeEventStatus(adaptativeEventStatus)
              .disableTriggered ? (
              <MoodSad size={24} />
            ) : null}
          </Grid.Col>
        </Grid>
      )}
    </>
  );
};

export default NavElement;
