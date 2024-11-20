import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
  client_id: z.string().trim().min(1, 'Client is required'),
});
export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
