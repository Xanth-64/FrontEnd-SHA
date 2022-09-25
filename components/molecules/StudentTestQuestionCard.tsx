import {
  Alert,
  Card,
  Center,
  Checkbox,
  Grid,
  Group,
  Radio,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { InfoSquare } from 'tabler-icons-react';
import { v4 } from 'uuid';

import axiosInstance from '../../lib/constants/axiosInstance';
import mapAdaptativeEventStatus from '../../lib/utils/mapAdaptativeEventStatus';

import adaptativeEvent from '../../types/api_schemas/adaptativeEvent';
import answerAlternative from '../../types/api_schemas/answerAlternative';
import studentTestQuestionCardProps from '../../types/component_schemas/studentTestQuestionCardProps';
import adaptativeEventStatus from '../../types/other_schemas/adaptativeEventStatus';

const StudentTestQuestionCard = ({
  form,
  index,
  testQuestion,
  componentLoading,
}: studentTestQuestionCardProps) => {
  const [adaptativeEvents, setAdaptativeEvents] = useState<adaptativeEvent[]>(
    []
  );
  const [adaptativeEventStatus, setAdaptativeEventStatus] =
    useState<adaptativeEventStatus>({});
  const [eventsLoading, setEventsLoading] = useState<boolean>(false);
  const [filteredAlternatives, setFilteredAlternatives] = useState<
    answerAlternative[]
  >([]);
  const fetchAdaptativeEvents = () => {
    const inner_function = async () => {
      if (testQuestion) {
        setEventsLoading(true);
        try {
          const { data } = await axiosInstance.get(
            `/test_questions/adaptative_events/triggered_events/${testQuestion.id}`
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
          case 'DISPLAY_HINT':
            setAdaptativeEventStatus((currentStatus) => {
              return { ...currentStatus, displayHintTriggered: true };
            });
            break;
          case 'REDUCE_ALTERNATIVES':
            // Calculate the total number of wrong alternatives
            const totalWrongAlternatives =
              testQuestion.answer_alternatives.reduce(
                (total: number, answerAlternative) => {
                  if (answerAlternative.is_correct === false) {
                    return total + 1;
                  }
                  return total;
                },
                0
              );
            // Calculate the number of wrong alternatives to be removed
            let wrongAlternativesToRemove = Math.floor(
              totalWrongAlternatives / 2
            );

            // Remove the wrong alternatives
            const newAlternatives = testQuestion.answer_alternatives.filter(
              (answerAlternative) => {
                if (!answerAlternative.is_correct) {
                  if (wrongAlternativesToRemove > 0) {
                    wrongAlternativesToRemove--;
                    return false;
                  }
                }
                return true;
              }
            );

            // Update the filtered alternatives
            setFilteredAlternatives(newAlternatives);

            setAdaptativeEventStatus((currentStatus) => {
              return { ...currentStatus, reduceAlternativesTriggered: true };
            });
            break;
          default:
            break;
        }
        if (index === 0) {
          if (
            adaptativeEv.triggered_change === 'DISPLAY_HINT' ||
            adaptativeEv.triggered_change === 'REDUCE_ALTERNATIVES'
          ) {
            setAdaptativeEventStatus((currentStatus) => {
              return { ...currentStatus, firstInteractionType: 'POSITIVE' };
            });
          } else {
            setAdaptativeEventStatus((currentStatus) => {
              return { ...currentStatus, firstInteractionType: 'NEGATIVE' };
            });
          }
        }
      });
    }
  };
  useEffect(fetchAdaptativeEvents, [testQuestion]);
  useEffect(updateAdaptativeEventStatus, [adaptativeEvents]);
  return (
    <Card
      withBorder
      shadow={'xs'}
      radius={'md'}
      style={{ padding: '36px 28px' }}
    >
      <Skeleton visible={eventsLoading}>
        <Stack spacing={'xl'} style={{ width: '100%' }}>
          <Group position={'apart'}>
            <Title order={3}>{`Pregunta #${index + 1}`}</Title>
            <Title order={3}>
              Ponderación: {testQuestion.question_score} Puntos
            </Title>
          </Group>
          {testQuestion.question_hint &&
          mapAdaptativeEventStatus(adaptativeEventStatus)
            .displayHintTriggered ? (
            <Alert
              icon={<InfoSquare size={18} />}
              title={'¡Una pista para ayudarte!'}
            >
              {testQuestion.question_hint}
            </Alert>
          ) : null}
          <Text>{testQuestion.question_prompt}</Text>
          {testQuestion.question_type === 'multiple_selection' ? (
            <Checkbox.Group
              {...form.getInputProps(
                `question_answers.${index}.selected_answer_alternatives`
              )}
            >
              <Grid align={'center'} style={{ width: '100%' }}>
                {mapAdaptativeEventStatus(adaptativeEventStatus)
                  .reduceAlternativesTriggered
                  ? filteredAlternatives.map((answerAlternative) => {
                      return (
                        <Grid.Col key={v4()} span={12} sm={6}>
                          <Center>
                            <Checkbox
                              value={answerAlternative.id}
                              label={answerAlternative.alternative_text}
                              color="orange"
                              disabled={componentLoading}
                            />
                          </Center>
                        </Grid.Col>
                      );
                    })
                  : testQuestion.answer_alternatives.map(
                      (answerAlternative) => {
                        return (
                          <Grid.Col key={v4()} span={12} sm={6}>
                            <Center>
                              <Checkbox
                                value={answerAlternative.id}
                                label={answerAlternative.alternative_text}
                                color="orange"
                                disabled={componentLoading}
                              />
                            </Center>
                          </Grid.Col>
                        );
                      }
                    )}
              </Grid>
            </Checkbox.Group>
          ) : (
            <Radio.Group
              value={
                form.values.question_answers[index]
                  .selected_answer_alternatives[0] ?? ''
              }
              onChange={(value) => {
                form.setFieldValue(
                  `question_answers.${index}.selected_answer_alternatives`,
                  [value]
                );
              }}
            >
              <Grid align={'center'} style={{ width: '100%' }}>
                {mapAdaptativeEventStatus(adaptativeEventStatus)
                  .reduceAlternativesTriggered
                  ? filteredAlternatives.map((answerAlternative) => {
                      return (
                        <Grid.Col key={v4()} span={12} sm={6}>
                          <Center>
                            <Radio
                              value={answerAlternative.id}
                              label={answerAlternative.alternative_text}
                              color="orange"
                              disabled={componentLoading}
                            />
                          </Center>
                        </Grid.Col>
                      );
                    })
                  : testQuestion.answer_alternatives.map(
                      (answerAlternative) => {
                        return (
                          <Grid.Col key={v4()} span={12} sm={6}>
                            <Center>
                              <Radio
                                value={answerAlternative.id}
                                label={answerAlternative.alternative_text}
                                color="orange"
                                disabled={componentLoading}
                              />
                            </Center>
                          </Grid.Col>
                        );
                      }
                    )}
              </Grid>
            </Radio.Group>
          )}
        </Stack>
      </Skeleton>
    </Card>
  );
};

export default StudentTestQuestionCard;
