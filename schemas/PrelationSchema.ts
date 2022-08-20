import { z } from 'zod';

const PrelationSchema = z
  .object({
    predecessor: z
      .string({ required_error: 'Se debe selecionar un tópico prelatorio' })
      .min(1, 'Se debe selecionar un tópico prelatorio')
      .trim(),
    successor: z
      .string({ required_error: 'Se debe selecionar un tópico objetivo' })
      .min(1, 'Se debe selecionar un tópico objetivo')
      .trim(),
    knowledge_weight: z
      .number()
      .min(0, 'El grado de prelación debe ser mayor o igual a 0')
      .max(100, 'El grado de prelación debe ser menor o igual a 100'),
  })
  .refine(
    (data) => {
      return data.predecessor !== data.successor;
    },
    {
      message:
        'El tópico prelatorio y el tópico objetivo no pueden ser iguales',
      path: ['successor'],
    }
  )
  .refine(
    (data) => {
      return data.predecessor !== data.successor;
    },
    {
      message:
        'El tópico prelatorio y el tópico objetivo no pueden ser iguales',
      path: ['predecessor'],
    }
  );

export default PrelationSchema;
