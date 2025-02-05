export interface AccountRepository {
  createAccount(user_id: string, currencies: number[]): void;
}
