export interface Client {
  readonly id: string;
  readonly name: string;
  readonly address: string | null;
  readonly email: string | null;
  readonly website: string | null;
  readonly phone_number: string | null;
  readonly fax_number: string | null;
  readonly created_at: Date;
  readonly modified_at: Date | null;
}
