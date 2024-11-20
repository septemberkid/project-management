import { z } from 'zod';
export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .max(100)
    .email('Invalid email address.'),
  password: z.string().trim().min(1, 'Password is required').min(8),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .max(100)
    .email('Invalid email address.'),
  password: z.string().trim().min(1, 'Password is required').min(8),
});
export type SignUpSchema = z.infer<typeof signUpSchema>;
