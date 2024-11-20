export interface Client {
  readonly id: string;
  readonly name: string;
  readonly address?: string;
  readonly email?: string;
  readonly website?: string;
  readonly phone?: string;
  readonly fax?: string;
  readonly created_at?: string;
  readonly modified_at?: string;
}
