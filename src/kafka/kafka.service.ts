import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTransactionDto } from '../transactions/dto/transactions.dto';
import { IConsolidateBalance } from '../balance/schemas/balance.schema';
import { Model } from 'mongoose';

@Injectable()
export class KafkaService {
  constructor(
    @InjectModel('ConsolidatedBalance')
    private readonly consolidateBalanceModel: Model<IConsolidateBalance>,
  ) {}

  async newTransaction(transaction: CreateTransactionDto): Promise<void> {
    const { accountId, createdAt, amount } = transaction;
    const transactionDate = new Date(createdAt);
    transactionDate.setHours(0, 0, 0, 0);

    await this.consolidateBalanceModel
      .findOneAndUpdate(
        {
          accountId,
          date: transactionDate,
        },
        {
          $inc: { amount: amount },
        },
        {
          upsert: true,
          new: true,
        },
      )
      .exec();
  }
}
