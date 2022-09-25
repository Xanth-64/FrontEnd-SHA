import { z } from 'zod';

const TemplateAdaptionSchema = z.object({
  default_knowledge: z
    .number()
    .min(0, 'El conocimiento por defecto debe ser mayor o igual a 0')
    .max(100, 'El conocimiento por defecto debe ser menor o igual a 100'),
  knowledge_weight: z
    .number()
    .min(0, 'El conocimiento por defecto debe ser mayor o igual a 0')
    .max(100, 'El conocimiento por defecto debe ser menor o igual a 100'),
});

export default TemplateAdaptionSchema;
