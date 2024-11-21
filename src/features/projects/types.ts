import { Client } from '@/features/clients/types';

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly start_date: Date | null;
  readonly end_date: Date | null;
  readonly client_id: string;
  readonly created_at: Date;
  readonly modified_at: Date | null;
}

export type ProjectWithClient = Project & {
  client?: Pick<Client, 'id' | 'name'>;
};
