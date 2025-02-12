import Account from "../../model/account";

export interface AccountDto {
  id: string;
  currency: string;
  balance: number;
}

export const toDto = (account: Account) => {
  return {
    id: account.id,
    currency: account.currency.acronym,
    balance: account.balance,
  };
};
