import { z } from 'zod';

const UpdateAccountSchema = z.object({
  first_name: z
    .string({ required_error: 'El correo electrónico es requerido.' })
    .trim()
    .min(1, { message: 'El correo electrónico es requerido.' })
    .max(50, { message: 'Sus nombres no puede tener más de 50 caracteres.' }),
  last_name: z
    .string({ required_error: 'Los Apellidos son Requeridos.' })
    .trim()
    .min(1, { message: 'Los Apellidos son Requeridos.' })
    .max(50, { message: 'Los Apellidos no pueden tener más 50 caracteres' }),
});

export default UpdateAccountSchema;
