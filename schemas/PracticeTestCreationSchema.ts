import { z } from 'zod';

const PracticeTestCreationSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(
        8,
        'El título de la prueba de práctica debe tener al menos 8 caracteres'
      )
      .max(
        50,
        'El título de la prueba de práctica no puede tener más de 50 caracteres'
      ),
    adaptation_weight: z
      .number()
      .min(0, 'La ponderación adaptativa debe ser mayor o igual a 0')
      .max(100, 'La ponderación adaptativa debe ser menor o igual a 100'),
    approval_score: z
      .number()
      .min(1, 'El puntaje de aprobación debe ser mayor o igual a 1'),
    show_on_init: z.boolean(),
    test_questions: z
      .array(
        z
          .object({
            question_type: z.enum(['multiple_selection', 'simple_selection']),
            question_prompt: z
              .string()
              .trim()
              .min(
                8,
                'El texto de la pregunta debe tener al menos 8 caracteres'
              )
              .max(
                250,
                'El texto de la pregunta no puede tener más de 250 caracteres'
              ),
            question_score: z
              .number()
              .min(1, 'El puntaje debe ser mayor a 0')
              .max(5, 'El puntaje debe ser menor o igual a 5'),
            question_hint: z
              .string()
              .max(250, 'La pista no puede tener más de 250 caracteres')
              .optional(),
            answer_alternatives: z.array(
              z.object({
                alternative_text: z
                  .string()
                  .trim()
                  .min(1, 'El texto de la alternativa no puede estar vacío')
                  .max(
                    50,
                    'El texto de la alternativa no puede tener más de 50 caracteres'
                  ),
                is_correct: z.boolean(),
              })
            ),
          })
          .refine(
            (testQuestion) => {
              return testQuestion.answer_alternatives.length > 1;
            },
            {
              message:
                'La pregunta debe tener al menos dos respuestas posibles',
              path: ['question_prompt'],
            }
          )
          .refine(
            (testQuestion) => {
              return !testQuestion.answer_alternatives.every(
                (answerAlternative) => {
                  return !answerAlternative.is_correct;
                }
              );
            },
            {
              message: 'La pregunta debe tener al menos una respuesta correcta',
              path: ['question_prompt'],
            }
          )
      )
      .nonempty('La prueba de práctica debe tener al menos una pregunta'),
  })
  .refine(
    (practiceTest) => {
      return practiceTest.test_questions.length > 0;
    },
    {
      message: 'La prueba de práctica debe tener al menos una pregunta',
      path: ['title'],
    }
  )
  .refine(
    (practiceTest) => {
      let total_score: number = 0;
      practiceTest.test_questions.forEach((test_question) => {
        total_score = total_score + test_question.question_score;
      });
      return practiceTest.approval_score <= total_score;
    },
    {
      message:
        'El puntaje de aprobación debe ser menor o igual que el total de los puntajes de las preguntas',
      path: ['approval_score'],
    }
  );

export default PracticeTestCreationSchema;
