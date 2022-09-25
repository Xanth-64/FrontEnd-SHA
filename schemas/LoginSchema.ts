import { z } from 'zod';

const LoginSchema = z.object({
  email: z
    .string({ required_error: 'El correo electrónico es requerido.' })
    .email({ message: 'Debe colocar una dirección de correo válida.' })
    .min(1, { message: 'El correo electrónico es requerido.' })
    .trim(),
  password: z
    .string({ required_error: 'La contraseña es requerida.' })
    .min(1, { message: 'La contraseña es requerida.' }),
});

export default LoginSchema;
