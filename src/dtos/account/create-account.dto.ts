import { CreateDto } from "../create.dto";

export interface CreateAccountDto extends CreateDto {
  user_id: string;
  currency_id: number;
  balance: number;
}
