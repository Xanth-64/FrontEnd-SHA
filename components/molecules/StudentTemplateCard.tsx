import {
  Button,
  Card,
  Center,
  Group,
  HoverCard,
  Image,
  Overlay,
  Skeleton,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MoodHappy, MoodSad } from 'tabler-icons-react';

import axiosInstance from '../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';
import mapAdaptativeEventStatus from '../../lib/utils/mapAdaptativeEventStatus';

import adaptativeEvent from '../../types/api_schemas/adaptativeEvent';
import studentTemplateCardProps from '../../types/component_schemas/studentTemplateCardProps';
import adaptativeEventStatus from '../../types/other_schemas/adaptativeEventStatus';

const StudentTemplateCard = ({
  template,
  displayNavigationButton,
  displayHeaderImage,
}: studentTemplateCardProps) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const [adaptativeEvents, setAdaptativeEvents] = useState<adaptativeEvent[]>(
    []
  );
  const [adaptativeEventStatus, setAdaptativeEventStatus] =
    useState<adaptativeEventStatus>({});
  const [eventsLoading, setEventsLoading] = useState<boolean>(false);

  const fetchAdaptativeEvents = () => {
    const inner_function = async () => {
      if (template) {
        setEventsLoading(true);
        try {
          const { data } = await axiosInstance.get(
            `/templates/adaptative_events/triggered_events/${template.id}`
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
            setAdaptativeEventStatus((currentStatus) => {
              return { ...currentStatus, notifyNegativeTriggered: true };
            });
            break;
          case 'NOTIFY_POSITIVE':
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
  useEffect(fetchAdaptativeEvents, [template]);
  useEffect(updateAdaptativeEventStatus, [adaptativeEvents]);
  return (
    <>
      {!mapAdaptativeEventStatus(adaptativeEventStatus).hideTriggered ? (
        <Skeleton visible={eventsLoading}>
          <Card
            shadow={'sm'}
            radius={'md'}
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
                mapAdaptativeEventStatus(adaptativeEventStatus).obscureTriggered
                  ? '2px'
                  : '1px',
            }}
          >
            {mapAdaptativeEventStatus(adaptativeEventStatus)
              .disableTriggered ? (
              <Overlay opacity={0.6} color="#000" blur={2} />
            ) : null}
            <Group position={'apart'}>
              {mapAdaptativeEventStatus(adaptativeEventStatus)
                .highlightTriggered ? (
                <>
                  <HoverCard>
                    <HoverCard.Target>
                      <MoodHappy size={36} />
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                      ¡Template Recomendado!
                    </HoverCard.Dropdown>
                  </HoverCard>

                  <HoverCard>
                    <HoverCard.Target>
                      <MoodHappy size={36} />
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                      ¡Template Recomendado!
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
                      ¡Template No Recomendado!
                    </HoverCard.Dropdown>
                  </HoverCard>
                  <HoverCard>
                    <HoverCard.Target>
                      <MoodSad size={36} />
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                      ¡Template No Recomendado!
                    </HoverCard.Dropdown>
                  </HoverCard>
                </>
              ) : null}
            </Group>
            {displayHeaderImage ? (
              <Card.Section>
                <Center>
                  <Image
                    src={template.image_url}
                    withPlaceholder
                    alt={`Representative Image for: ${template.title}`}
                    style={{ maxWidth: '450px', minHeight: '100px' }}
                    height={template.title ? 200 : undefined}
                  />
                </Center>
              </Card.Section>
            ) : null}
            <Stack
              spacing={'xl'}
              justify={'center'}
              align={'center'}
              style={{ padding: '36px 28px' }}
            >
              <Title order={2} align={'left'}>
                {template.title}
              </Title>

              <Text style={{ width: '100%' }} align={'left'}>
                {template.description}
              </Text>
              {displayNavigationButton ? (
                <Button
                  onClick={() => {
                    if (
                      mapAdaptativeEventStatus(adaptativeEventStatus)
                        .notifyPositiveTriggered
                    ) {
                      ShowSuccessfullCreate(
                        '¡Recomendación!',
                        `¡Te recomendamos echarle un ojo al template "${template.title}"!`
                      );
                    }
                    if (
                      mapAdaptativeEventStatus(adaptativeEventStatus)
                        .notifyNegativeTriggered
                    ) {
                      ShowFailedNotification(
                        '¡Recomendación!',
                        `¡Te recomendamos no revisar todavía al template "${template.title}"! Hay otros templates que serán más de tu gusto.`
                      );
                    }
                    router.push(`/student/template/${template.id}`);
                  }}
                  color={'dark'}
                  radius={'md'}
                  size={'lg'}
                >
                  Revisar
                </Button>
              ) : null}
            </Stack>
          </Card>
        </Skeleton>
      ) : null}
    </>
  );
};

export default StudentTemplateCard;
