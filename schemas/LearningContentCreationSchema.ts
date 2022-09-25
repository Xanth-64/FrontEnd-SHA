import { z } from 'zod';

const LearningContentCreationSchema = z.object({
  title: z
    .string({ required_error: 'El titulo del tema es requerido' })
    .min(8, 'El título de la página debe tener al menos 8 caracteres')
    .max(50, 'El título de la página no puede tener más de 50 caracteres')
    .trim(),
  content: z.string().trim(),
});

export default LearningContentCreationSchema;
