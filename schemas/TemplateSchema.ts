import { z } from 'zod';

const TemplateSchema = z.object({
  title: z
    .string({ required_error: 'El título del template es requerido' })
    .min(8, 'El título del template debe tener al menos 8 caracteres')
    .max(30, 'El título del template no puede tener más de 30 caracteres')
    .trim(),
  description: z
    .string()
    .max(500, 'La descripción del template no puede superar los 500 caracteres')
    .trim(),
  default_knowledge: z
    .number()
    .min(0, 'El conocimiento por defecto debe ser mayor o igual a 0')
    .max(100, 'El conocimiento por defecto debe ser menor o igual a 100'),
  knowledge_weight: z
    .number()
    .min(0, 'El conocimiento por defecto debe ser mayor o igual a 0')
    .max(100, 'El conocimiento por defecto debe ser menor o igual a 100'),
  leak_parameter: z
    .number()
    .min(0, 'El parámetro de fuga debe ser mayor o igual a 0')
    .max(5, 'El parámetro de fuga debe ser menor o igual a 5'),
});

export default TemplateSchema;
