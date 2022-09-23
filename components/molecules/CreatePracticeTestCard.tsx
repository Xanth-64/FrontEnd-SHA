import {
  Card,
  Stack,
  TextInput,
  Title,
  Transition,
  Text,
  Button,
  Textarea,
  Select,
  Slider,
  Group,
  useMantineTheme,
  UnstyledButton,
  ThemeIcon,
  Checkbox,
  Divider,
  Grid,
  NumberInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useViewportSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, DeviceFloppy, Plus, X } from 'tabler-icons-react';
import axiosInstance from '../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';
import PracticeTestCreationSchema from '../../schemas/PracticeTestCreationSchema';
import createPracticeTestCardProps from '../../types/component_schemas/createPracticeTestCardProps';
import CustomLoadingOverlay from '../overlays/CustomLoadingOverlay';

export const CreatePracticeTestCard = ({
  displayContent,
  onClose,
  currentTemplate,
  currentPracticeTest,
  refetchData,
}: createPracticeTestCardProps) => {
  const [componentLoading, setComponentLoading] = useState<boolean>(false);
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const mobile = width < theme.breakpoints.md;
  const form = useForm({
    validate: zodResolver(PracticeTestCreationSchema),
    initialValues: {
      title: currentPracticeTest ? currentPracticeTest.title : '',
      show_on_init: currentPracticeTest
        ? currentPracticeTest.show_on_init
        : false,
      approval_score: currentPracticeTest
        ? currentPracticeTest.approval_score
        : 1,
      adaptation_weight: currentPracticeTest
        ? currentPracticeTest.adaptation_weight
        : 50,
      test_questions: currentPracticeTest?.test_questions
        ? currentPracticeTest.test_questions
        : ([] as any[]),
    },
  });
  useEffect(() => {
    if (currentPracticeTest) {
      form.setValues({
        title: currentPracticeTest.title,
        show_on_init: currentPracticeTest.show_on_init,
        approval_score: currentPracticeTest
          ? currentPracticeTest.approval_score
          : 1,
        adaptation_weight: currentPracticeTest
          ? currentPracticeTest.adaptation_weight
          : 50,
        test_questions: currentPracticeTest?.test_questions
          ? currentPracticeTest.test_questions
          : [],
      });
      return;
    }
    form.reset();
  }, [currentPracticeTest]);
  return (
    <Transition
      mounted={displayContent}
      transition={'slide-left'}
      duration={400}
    >
      {(styles) => {
        return (
          <Card shadow={'sm'} radius={'md'} style={styles}>
            <CustomLoadingOverlay visible={componentLoading} />
            <form
              onSubmit={form.onSubmit(async (values) => {
                setComponentLoading(true);
                try {
                  if (currentPracticeTest) {
                    const { data } = await axiosInstance.put(
                      `/practice_tests/${currentPracticeTest.id}`,
                      {
                        ...values,
                      }
                    );
                    ShowSuccessfullCreate(
                      'Prueba actualizada exitosamente.',
                      `La prueba "${data.data.title}" ha sido actualizada exitosamente.`
                    );
                  } else {
                    const { data } = await axiosInstance.post('/pages/', {
                      template_id: currentTemplate?.id,
                      practice_test: {
                        ...values,
                      },
                    });
                    ShowSuccessfullCreate(
                      'Prueba creada exitosamente.',
                      `La prueba "${data.data.practice_test.title}" ha sido creada exitosamente.`
                    );
                  }
                  if (onClose) {
                    form.reset();
                    onClose();
                  }
                  if (refetchData) {
                    refetchData();
                  }
                } catch (error: any) {
                  if (error?.response?.status === 400) {
                    if (
                      error?.response?.data?.data?.error ===
                      'MODEL_HAS_TEST_ATTEMPTS'
                    ) {
                      form.setErrors({
                        title: 'Ya esta prueba tiene intentos realizados.',
                      });
                      ShowFailedNotification(
                        'Error al modificar la prueba.',
                        'Ya esta prueba tiene intentos realizados por un estudiante. No puede modificarse.'
                      );
                    } else {
                      form.setErrors({
                        title: 'Ya existe una prueba con este nombre.',
                      });
                      ShowFailedNotification(
                        'Error al crear la prueba.',
                        'Ya existe una prueba con el nombre que usted ha ingresado.'
                      );
                    }
                  } else {
                    ShowFailedNotification(
                      'Error al crear la prueba.',
                      'Ocurrió un error inesperado al intentar crear la prueba. Intente nuevamente.'
                    );
                  }
                }
                setComponentLoading(false);
              })}
            >
              <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
                <Group position={'apart'}>
                  <Title order={!mobile ? 3 : 5}>
                    {currentPracticeTest ? 'Modificar' : 'Crear'} Prueba de
                    Práctica
                  </Title>
                  {onClose ? (
                    <X
                      size={25}
                      color={theme.colors.gray[7]}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        form.reset();
                        onClose();
                      }}
                    />
                  ) : null}
                </Group>
                <TextInput
                  label="Título"
                  description="Título de la Prueba"
                  placeholder="Construcción de Condiciones Lógicas"
                  size={'md'}
                  {...form.getInputProps('title')}
                  disabled={componentLoading}
                />
                <Checkbox
                  label={'Utilizar como Prueba de Nivel Inicial'}
                  color={'orange'}
                  {...form.getInputProps('show_on_init')}
                  value={form.values.show_on_init}
                />
                <NumberInput
                  label="Puntaje de Aprobación"
                  description="Puntaje que usted consideraría como aprobatorio para esta prueba"
                  size={'md'}
                  {...form.getInputProps('approval_score')}
                  disabled={componentLoading}
                />
                <Text weight="bold" size="md">
                  Ponderación Adaptativa
                </Text>
                <Slider
                  color={'orange'}
                  marks={[
                    { value: 0, label: '0' },
                    { value: 20, label: '20' },
                    { value: 40, label: '40' },
                    { value: 60, label: '60' },
                    { value: 80, label: '80' },
                    { value: 100, label: '100' },
                  ]}
                  min={0}
                  max={100}
                  value={form.values.adaptation_weight}
                  onChange={(value) => {
                    form.setFieldValue('adaptation_weight', value);
                  }}
                  disabled={componentLoading}
                />
                <Text weight="bold" size="md">
                  Contenido de la Prueba
                </Text>
                <Stack spacing={'xl'}>
                  {form.values.test_questions.map((question, index) => {
                    return (
                      <Card
                        key={index}
                        withBorder
                        style={{ padding: '36px 28px' }}
                      >
                        <Stack spacing={'xl'}>
                          <Group position={'apart'}>
                            {index !== 0 ? (
                              <ArrowUp
                                size={25}
                                color={theme.colors.gray[7]}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  form.reorderListItem('test_questions', {
                                    from: index,
                                    to: index - 1,
                                  });
                                }}
                              />
                            ) : (
                              <div />
                            )}
                            {index !== form.values.test_questions.length - 1 ? (
                              <ArrowDown
                                size={25}
                                color={theme.colors.gray[7]}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  form.reorderListItem('test_questions', {
                                    from: index,
                                    to: index + 1,
                                  });
                                }}
                              />
                            ) : (
                              <div />
                            )}
                          </Group>
                          <Group position={'apart'}>
                            <Text weight="bold" size="sm">
                              Pregunta {index + 1}
                            </Text>
                            <X
                              size={18}
                              color={theme.colors.gray[7]}
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                form.removeListItem('test_questions', index);
                              }}
                            />
                          </Group>
                          <Select
                            {...form.getInputProps(
                              `test_questions.${index}.question_type`
                            )}
                            data={[
                              {
                                label: 'Pregunta de Selección Múltiple',
                                value: 'multiple_selection',
                              },
                              {
                                label: 'Pregunta de Selección Única',
                                value: 'simple_selection',
                              },
                            ]}
                            disabled={componentLoading}
                          />
                          <Textarea
                            label="Enunciado"
                            description="Enunciado de la Pregunta"
                            disabled={componentLoading}
                            placeholder="¿Cual de las siguientes condiciones es verdadera?"
                            size={'sm'}
                            maxRows={3}
                            {...form.getInputProps(
                              `test_questions.${index}.question_prompt`
                            )}
                          />
                          <Text weight="bold" size="sm">
                            Puntaje de la Pregunta
                          </Text>
                          <Slider
                            color={'orange'}
                            marks={[
                              { value: 1, label: '1' },
                              { value: 2, label: '2' },
                              { value: 3, label: '3' },
                              { value: 4, label: '4' },
                              { value: 5, label: '5' },
                            ]}
                            min={1}
                            max={5}
                            value={
                              form.values.test_questions[index].question_score
                            }
                            onChange={(value) => {
                              form.setFieldValue(
                                `test_questions.${index}.question_score`,
                                value
                              );
                            }}
                            disabled={componentLoading}
                          />
                          <TextInput
                            label="Pista"
                            description="Pista opcional para la pregunta."
                            disabled={componentLoading}
                            placeholder="Recuerda que el código se ejecuta desde arriba hacia abajo."
                            size={'sm'}
                            maxRows={3}
                            {...form.getInputProps(
                              `test_questions.${index}.question_hint`
                            )}
                          />
                          <Group spacing={'lg'}>
                            <Text weight="bold" size="sm">
                              Respuestas de la Pregunta
                            </Text>
                            <UnstyledButton
                              onClick={() => {
                                form.insertListItem(
                                  `test_questions.${index}.answer_alternatives`,
                                  {
                                    alternative_text: '',
                                    is_correct: false,
                                  }
                                );
                              }}
                            >
                              <ThemeIcon variant={'light'} color={'orange'}>
                                <Plus size={18} />
                              </ThemeIcon>
                            </UnstyledButton>
                          </Group>
                          <Stack spacing={'xl'}>
                            {form.values.test_questions[
                              index
                            ].answer_alternatives.map(
                              (answer: any, answerIndex: number) => {
                                return (
                                  <Card withBorder key={answerIndex}>
                                    <Stack>
                                      <Group position={'apart'}>
                                        {answerIndex !== 0 ? (
                                          <ArrowUp
                                            size={15}
                                            color={theme.colors.gray[7]}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                              form.reorderListItem(
                                                `test_questions.${index}.answer_alternatives`,
                                                {
                                                  from: answerIndex,
                                                  to: answerIndex - 1,
                                                }
                                              );
                                            }}
                                          />
                                        ) : (
                                          <div />
                                        )}
                                        {answerIndex !==
                                        form.values.test_questions[index]
                                          .answer_alternatives.length -
                                          1 ? (
                                          <ArrowDown
                                            size={15}
                                            color={theme.colors.gray[7]}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                              form.reorderListItem(
                                                `test_questions.${index}.answer_alternatives`,
                                                {
                                                  from: answerIndex,
                                                  to: answerIndex + 1,
                                                }
                                              );
                                            }}
                                          />
                                        ) : (
                                          <div />
                                        )}
                                      </Group>
                                      <Group position={'apart'}>
                                        <Text weight="bold" size="xs">
                                          Respuesta {answerIndex + 1}
                                        </Text>
                                        <X
                                          size={15}
                                          color={theme.colors.gray[7]}
                                          style={{ cursor: 'pointer' }}
                                          onClick={() => {
                                            form.removeListItem(
                                              `test_questions.${index}.answer_alternatives`,
                                              answerIndex
                                            );
                                          }}
                                        />
                                      </Group>
                                      <TextInput
                                        label="Respuesta"
                                        description="Posible respuesta a la Pregunta"
                                        placeholder="Opción A"
                                        size={'xs'}
                                        disabled={componentLoading}
                                        {...form.getInputProps(
                                          `test_questions.${index}.answer_alternatives.${answerIndex}.alternative_text`
                                        )}
                                      />
                                      <Checkbox
                                        label={'Esta respuesta es correcta.'}
                                        size={'xs'}
                                        {...form.getInputProps(
                                          `test_questions.${index}.answer_alternatives.${answerIndex}.is_correct`
                                        )}
                                        disabled={componentLoading}
                                        color={'orange'}
                                      />
                                    </Stack>
                                  </Card>
                                );
                              }
                            )}
                          </Stack>
                        </Stack>
                      </Card>
                    );
                  })}
                </Stack>
                <Stack align={'center'}>
                  <Button
                    radius={'lg'}
                    color={'dark'}
                    size={'sm'}
                    loading={componentLoading}
                    type={'button'}
                    leftIcon={<Plus size={18} />}
                    onClick={() => {
                      form.insertListItem('test_questions', {
                        question_type: 'simple_selection',
                        question_prompt: '',
                        question_score: 1,
                        answer_alternatives: [],
                      });
                    }}
                  >
                    Añadir Pregunta
                  </Button>
                </Stack>
                <Divider />
                <Grid align={'center'}>
                  <Grid.Col span={12} sm={4} offsetSm={4}>
                    <Button
                      radius={'lg'}
                      color={'orange'}
                      loading={componentLoading}
                      type={'submit'}
                      size={'md'}
                      fullWidth
                      leftIcon={<DeviceFloppy size={25} />}
                    >
                      Guardar
                    </Button>
                  </Grid.Col>
                </Grid>
              </Stack>
            </form>
          </Card>
        );
      }}
    </Transition>
  );
};

export default CreatePracticeTestCard;
