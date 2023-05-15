import { IsNumber, IsString, Matches } from 'class-validator';

export class BalanceDTO {
  @IsNumber()
  accountId: number;

  @IsString()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'Invalid date format. The date should be in DD/MM/YYYY format.',
  })
  date: string;
}
