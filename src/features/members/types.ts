export interface Member {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly base_role: string;
  readonly created_at: Date;
  readonly modified_at: Date | null;
  readonly deleted_at: Date | null;
}
