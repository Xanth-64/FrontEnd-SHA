import {
  Card,
  Center,
  Checkbox,
  Grid,
  Group,
  Radio,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Check, X } from 'tabler-icons-react';
import { v4 } from 'uuid';
import studentPracticeTestAttemptDisplayProps from '../../types/component_schemas/studentPracticeTestAttemptDisplayProps';
import CardHolder from '../templates/CardHolder';

const StudentPracticeTestAttemptDisplay = ({
  testAttempt,
}: studentPracticeTestAttemptDisplayProps) => {
  const theme = useMantineTheme();
  return (
    <CardHolder>
      <Card
        withBorder
        shadow={'xs'}
        radius={'md'}
        style={{ padding: '36px 28px' }}
      >
        <Stack spacing={'xl'}>
          <Title order={1}>{testAttempt.practice_test.title}</Title>
          <Text weight={'bold'}>
            Puntaje Obtenido: {testAttempt.acquired_score}/
            {testAttempt.practice_test.total_score}
          </Text>
        </Stack>
      </Card>
      <CardHolder>
        {testAttempt.question_answers.map((questionAnswer, index) => {
          return (
            <Card
              key={questionAnswer.id}
              withBorder
              shadow={'xs'}
              radius={'md'}
              style={{
                padding: '36px 28px',
                backgroundColor: questionAnswer.is_correct
                  ? theme.colors.green[1]
                  : theme.colors.red[1],
                borderColor: questionAnswer.is_correct
                  ? theme.colors.green[3]
                  : theme.colors.red[3],
                borderWidth: '2px',
              }}
            >
              <Stack spacing={'xl'} style={{ width: '100%' }}>
                <Group position={'apart'}>
                  <Title order={3}>{`Pregunta #${index + 1}`}</Title>
                  <Title order={3}>
                    {questionAnswer.acquired_score}/
                    {questionAnswer.test_question.question_score}
                  </Title>
                </Group>
                <Text>{questionAnswer.test_question.question_prompt}</Text>
                <Grid>
                  {questionAnswer.test_question.answer_alternatives.map(
                    (answerAlternative) => {
                      return (
                        <Grid.Col key={v4()} span={12} sm={6}>
                          {questionAnswer.test_question.question_type ===
                          'multiple_selection' ? (
                            <Center>
                              <Checkbox
                                checked={
                                  questionAnswer.selected_answer_alternatives.find(
                                    (value) =>
                                      value.answer_alternative_id ===
                                      answerAlternative.id
                                  ) !== undefined
                                }
                                color={
                                  answerAlternative.is_correct ? 'green' : 'red'
                                }
                                value={answerAlternative.id}
                                label={
                                  <Text color={theme.black[0]} weight={'bold'}>
                                    <Group spacing={'xs'} align="center">
                                      {answerAlternative.is_correct ? (
                                        <Check size={16} />
                                      ) : (
                                        <X size={16} />
                                      )}
                                      {answerAlternative.alternative_text}
                                    </Group>
                                  </Text>
                                }
                              />
                            </Center>
                          ) : (
                            <Center>
                              <Radio
                                checked={
                                  questionAnswer.selected_answer_alternatives.find(
                                    (value) =>
                                      value.answer_alternative_id ===
                                      answerAlternative.id
                                  ) !== undefined
                                }
                                color={
                                  answerAlternative.is_correct ? 'green' : 'red'
                                }
                                value={answerAlternative.id}
                                label={
                                  <Text color={theme.black[0]} weight={'bold'}>
                                    <Group spacing={'xs'} align="center">
                                      {answerAlternative.is_correct ? (
                                        <Check size={16} />
                                      ) : (
                                        <X size={16} />
                                      )}
                                      {answerAlternative.alternative_text}
                                    </Group>
                                  </Text>
                                }
                              />
                            </Center>
                          )}
                        </Grid.Col>
                      );
                    }
                  )}
                </Grid>
              </Stack>
            </Card>
          );
        })}
      </CardHolder>
    </CardHolder>
  );
};

export default StudentPracticeTestAttemptDisplay;
