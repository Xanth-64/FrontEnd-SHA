import {
  Button,
  Card,
  Checkbox,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 } from 'uuid';

import axiosInstance from '../../lib/constants/axiosInstance';
import varkCuestionnaireList from '../../lib/constants/varkCuestionnaireList';
import useUser from '../../lib/hooks/useUser';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';

import CardHolder from '../templates/CardHolder';

import VarkSchema from '../../schemas/VarkSchema';

const VarkTestForm = () => {
  const form = useForm({
    validate: zodResolver(VarkSchema),
    initialValues: {
      vark_answers: varkCuestionnaireList.map(() => []),
    },
  });
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        setLoading(true);
        try {
          const learningStyles = {
            visual: 0,
            aural: 0,
            textual: 0,
            kinesthetic: 0,
          };
          values.vark_answers.forEach((sub_arr) => {
            sub_arr.forEach((selected_learning_style) => {
              switch (selected_learning_style) {
                case 'visual':
                  learningStyles.visual++;
                  break;
                case 'aural':
                  learningStyles.aural++;
                  break;
                case 'textual':
                  learningStyles.textual++;
                  break;
                case 'kinesthetic':
                  learningStyles.kinesthetic++;
                  break;
              }
            });
          });
          await axiosInstance.put('/learning_style/', values);
          router.push(`/${user?.role[0].role_name}`);
        } catch (err: any) {
          ShowFailedNotification(
            '¡Error Inesperado!',
            'Ocurrió un error inesperado enviando tu prueba. Por favor, intenta nuevamente'
          );
        }
        setLoading(false);
      })}
    >
      <CardHolder>
        <>
          <Card style={{ width: '100%' }} withBorder shadow={'xs'}>
            <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
              <Title order={3}>Cuestionario de Estilos de Aprendizaje</Title>
              <Text>
                A continuación se le presenta un breve cuestionario para
                aprender más acerca de su estilo de aprendizaje. El propósito
                del mismo es conocer un poco más de usted de modo que se pueda
                mostrar contenido que sea de su particular agrado. Para cada
                pregunta, seleccione aquellas respuestas que mejor se adapten a
                su percepción.{' '}
              </Text>
            </Stack>
          </Card>
          {varkCuestionnaireList.map((varkQuestion, questionIndex) => {
            return (
              <Card
                key={v4()}
                style={{ width: '100%' }}
                withBorder
                shadow={'xs'}
              >
                <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
                  <Text>{varkQuestion.question_prompt}</Text>
                  <Checkbox.Group
                    {...form.getInputProps(`vark_answers.${questionIndex}`)}
                  >
                    <Grid
                      justify={'center'}
                      align={'center'}
                      style={{ width: '100%' }}
                    >
                      {varkQuestion.question_alternatives.map(
                        (varkQuestionAlternative) => {
                          return (
                            <Grid.Col key={v4()} span={12} sm={6}>
                              <Checkbox
                                value={varkQuestionAlternative.learning_style}
                                label={
                                  varkQuestionAlternative.alternative_prompt
                                }
                                color="orange"
                                disabled={loading}
                              />
                            </Grid.Col>
                          );
                        }
                      )}
                    </Grid>
                  </Checkbox.Group>
                </Stack>
              </Card>
            );
          })}
          <Card style={{ width: '100%' }} withBorder shadow={'xs'}>
            <Group position={'right'}>
              <Button
                radius={'lg'}
                color={'orange'}
                loading={loading}
                type={'submit'}
                size={'md'}
              >
                Culminar Prueba
              </Button>
            </Group>
          </Card>
        </>
      </CardHolder>
    </form>
  );
};

export default VarkTestForm;
