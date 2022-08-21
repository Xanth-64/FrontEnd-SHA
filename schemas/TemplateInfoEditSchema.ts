import { z } from 'zod';

const TemplateInfoEditSchema = z.object({
  title: z
    .string({ required_error: 'El título del template es requerido' })
    .min(8, 'El título del template debe tener al menos 8 caracteres')
    .max(30, 'El título del template no puede tener más de 30 caracteres')
    .trim(),
  description: z
    .string()
    .max(500, 'La descripción del template no puede superar los 500 caracteres')
    .trim(),
  image_url: z.string(),
});

export default TemplateInfoEditSchema;
