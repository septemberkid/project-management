import { z } from 'zod';

export const memberSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.preprocess(
    val => (val === '' ? undefined : val),
    z.string().email({
      message: 'Invalid email address',
    }),
  ),
  base_role: z.string().trim().min(1, 'Base role is required').max(10),
});
export type MemberSchema = z.infer<typeof memberSchema>;
