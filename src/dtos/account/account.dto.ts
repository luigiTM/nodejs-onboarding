import Account from "../../model/account";

export interface AccountDto {
  id: string;
  userId: string;
  currencyAcronym: string;
  currencyId: number;
  balance: number;
}

export const toDto = (account: Account): AccountDto => {
  return {
    id: account.id,
    userId: account.user.id,
    currencyAcronym: account.currency.acronym,
    currencyId: account.currency.id,
    balance: account.balance,
  };
};
