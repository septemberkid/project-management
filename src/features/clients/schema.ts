import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  address: z.string().max(255).optional(),
  email: z.preprocess(
    val => (val === '' ? undefined : val),
    z
      .string()
      .email({
        message: 'Invalid email address',
      })
      .optional(),
  ),
  website: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  fax: z.string().max(20).optional(),
});

export type CreateClientSchema = z.infer<typeof createClientSchema>;
