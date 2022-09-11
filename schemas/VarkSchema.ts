import { z } from 'zod';

const VarkSchema = z
  .object({ vark_answers: z.array(z.array(z.string())) })
  .refine(
    (answers_object) => {
      return !answers_object.vark_answers.every((sub_array) => {
        return sub_array.length === 0;
      });
    },
    {
      message: 'Debe responder como mínimo una pregunta.',
      path: ['vark_answers'],
    }
  );

export default VarkSchema;
