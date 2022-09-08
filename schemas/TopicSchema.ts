import { z } from 'zod';

const TopicSchema = z.object({
  title: z
    .string({ required_error: 'El titulo del tema es requerido' })
    .min(8, 'El título del tema debe tener al menos 8 caracteres')
    .max(30, 'El título del tema no puede tener más de 30 caracteres')
    .trim(),
  icon_name: z.string().min(1, {
    message: 'Debe seleccionar un ícono.',
  }),
  default_knowledge: z
    .number()
    .min(0, 'El conocimiento por defecto debe ser mayor o igual a 0')
    .max(100, 'El conocimiento por defecto debe ser menor o igual a 100'),
  leak_parameter: z
    .number()
    .min(0, 'El parámetro de fuga debe ser mayor o igual a 0')
    .max(5, 'El parámetro de fuga debe ser menor o igual a 5'),
});

export default TopicSchema;
