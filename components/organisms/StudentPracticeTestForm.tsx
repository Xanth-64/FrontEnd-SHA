import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/router';
import { useState } from 'react';

import axiosInstance from '../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';

import studentPracticeTestFormProps from '../../types/component_schemas/studentPracticeTestFormProps';

import CardHolder from '../templates/CardHolder';

import StudentTestQuestionCard from '../molecules/StudentTestQuestionCard';

import PracticeTestAttemptSchema from '../../schemas/PracticeTestAttemptSchema';

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
          {practiceTest.test_questions?.map((testQuestion, index) => {
            return (
              <StudentTestQuestionCard
                key={testQuestion.id}
                testQuestion={testQuestion}
                index={index}
                componentLoading={componentLoading}
                form={form}
              />
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
