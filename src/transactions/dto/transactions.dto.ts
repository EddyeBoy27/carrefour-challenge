import { Exclude, Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString, Validate } from 'class-validator';
import { TransactionType } from '../enum/transaction.enum';

function IsDecimalWithMinimumDigits(minimumDigits: number) {
  return Validate((value: any) => {
    const decimalPattern = new RegExp(`^[0-9]+\\.[0-9]{${minimumDigits},}$`);
    return typeof value === 'number' && decimalPattern.test(String(value));
  });
}

export class CreateTransactionDto {
  @IsNumber()
  accountId: number;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsString()
  @IsDecimalWithMinimumDigits(2)
  amount: number;

  @IsString()
  description: string;

  @Transform(() => undefined)
  @Exclude()
  createdAt?: Date = new Date();
}
