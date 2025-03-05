import Account from "../../model/account";

export interface AccountDto {
  id: string;
  userId: string;
  currency: string;
  balance: number;
}

export const toDto = (account: Account): AccountDto => {
  return {
    id: account.id,
    userId: account.user.id,
    currency: account.currency.acronym,
    balance: account.balance,
  };
};
