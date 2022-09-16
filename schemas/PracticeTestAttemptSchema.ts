import { z } from 'zod';

const PracticeTestAttemptSchema = z
  .object({
    practice_test_id: z.string(),
    question_answers: z.array(
      z.object({
        test_question_id: z.string(),
        selected_answer_alternatives: z.array(z.string()),
      })
    ),
  })
  .refine(
    (answers_object) => {
      return answers_object.question_answers.every((question) => {
        return question.selected_answer_alternatives.length !== 0;
      });
    },
    {
      message: 'Debe responder todas las preguntas.',
      path: ['question_answers'],
    }
  );

export default PracticeTestAttemptSchema;
