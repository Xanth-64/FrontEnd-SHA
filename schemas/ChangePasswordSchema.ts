import { z } from 'zod';

const ChangePasswordSchema = z
  .object({
    old_password: z.string().min(1, {
      message: 'La contraseña actual es requerida.',
    }),
    new_password: z.string().min(8, {
      message: 'Su contraseña debe tener como mínimo 8 caracteres.',
    }),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Su contraseña y la confirmación deben ser iguales.',
    path: ['confirm_password'],
  });

export default ChangePasswordSchema;
