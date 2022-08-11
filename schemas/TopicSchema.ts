import { z } from 'zod';

const TopicSchema = z.object({
  title: z
    .string({ required_error: 'El correo electrónico es requerido' })
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
});

export default TopicSchema;
