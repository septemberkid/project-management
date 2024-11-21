import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  description: z.string().max(150).optional(),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
  client_id: z
    .string({
      required_error: 'Client is required',
    })
    .trim(),
});
export type ProjectSchema = z.infer<typeof projectSchema>;
