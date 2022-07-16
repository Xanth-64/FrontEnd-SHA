import { z } from 'zod';

const SignupSchema = z
  .object({
    email: z
      .string({ required_error: 'El correo electrónico es requerido' })
      .email({ message: 'Debe colocar una dirección de correo válida.' })
      .trim(),
    password: z.string().min(8, {
      message: 'Su contraseña debe tener como mínimo 8 caracteres.',
    }),
    confirm: z.string(),
    instructor: z.boolean(),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Su contraseña y la confirmación deben ser iguales.',
    path: ['confirm'],
  });

export default SignupSchema;
