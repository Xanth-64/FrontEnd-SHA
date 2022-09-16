import {
  Button,
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
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 } from 'uuid';
import axiosInstance from '../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';
import PracticeTestAttemptSchema from '../../schemas/PracticeTestAttemptSchema';
import studentPracticeTestFormProps from '../../types/component_schemas/studentPracticeTestFormProps';
import CardHolder from '../templates/CardHolder';

const StudentPracticeTestForm = ({
  practiceTest,
}: studentPracticeTestFormProps) => {
  const [componentLoading, setComponentLoading] = useState<boolean>(false);
  const theme = useMantineTheme();
  const router = useRouter();
  const form = useForm({
    validate: zodResolver(PracticeTestAttemptSchema),
    initialValues: {
      practice_test_id: practiceTest.id,
      question_answers: practiceTest.test_questions
        ? practiceTest.test_questions.map((test_question) => {
            return {
              test_question_id: test_question.id,
              selected_answer_alternatives: [],
            };
          })
        : [],
    },
    initialErrors: {
      question_answers: '',
    },
  });
  return (
    <CardHolder>
      <Card
        withBorder
        shadow={'xs'}
        radius={'md'}
        style={{ padding: '36px 28px' }}
      >
        <Title order={1}>{practiceTest.title}</Title>
      </Card>
      <form
        onSubmit={form.onSubmit(async (values) => {
          setComponentLoading(true);
          try {
            await axiosInstance.post('/test_attempt/', values);
            ShowSuccessfullCreate(
              'Prueba completada con éxito',
              'La prueba se ha completado con éxito, puedes ver tus resultados.'
            );
            router.push(`/student/template/${practiceTest.page?.template_id}`);
          } catch (error: any) {
            ShowFailedNotification(
              'Error al completar la prueba',
              'Un error inesperado ocurrió al completar la prueba. Por favor intenta de nuevo.'
            );
          }
          setComponentLoading(false);
        })}
      >
        <CardHolder>
          {practiceTest.test_questions?.map((test_question, index) => {
            return (
              <Card
                key={test_question.id}
                withBorder
                shadow={'xs'}
                radius={'md'}
                style={{ padding: '36px 28px' }}
              >
                <Stack spacing={'xl'} style={{ width: '100%' }}>
                  <Group position={'apart'}>
                    <Title order={3}>{`Pregunta #${index + 1}`}</Title>
                    <Title order={3}>
                      Ponderación: {test_question.question_score} Puntos
                    </Title>
                  </Group>
                  <Text>{test_question.question_prompt}</Text>
                  {test_question.question_type === 'multiple_selection' ? (
                    <Checkbox.Group
                      {...form.getInputProps(
                        `question_answers.${index}.selected_answer_alternatives`
                      )}
                    >
                      <Grid align={'center'} style={{ width: '100%' }}>
                        {test_question.answer_alternatives.map(
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
                        {test_question.answer_alternatives.map(
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
              </Card>
            );
          })}
          <Card style={{ width: '100%' }} withBorder shadow={'xs'}>
            <Stack>
              <Group position={'apart'}>
                {form.errors.question_answers ? (
                  <Text
                    color={
                      theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
                    }
                    weight={'bold'}
                  >
                    {form.errors.question_answers}
                  </Text>
                ) : (
                  <div />
                )}
                <Button
                  radius={'lg'}
                  color={'orange'}
                  loading={componentLoading}
                  type={'submit'}
                  size={'md'}
                >
                  Culminar Prueba
                </Button>
              </Group>
            </Stack>
          </Card>
        </CardHolder>
      </form>
    </CardHolder>
  );
};

export default StudentPracticeTestForm;
