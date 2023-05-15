import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IConsolidateBalance } from './schemas/balance.schema';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel('ConsolidatedBalance')
    private readonly consolidateBalanceModel: Model<IConsolidateBalance>,
  ) {}

  async getConsolidatedBalance(
    accountId: number,
    date: string,
  ): Promise<IConsolidateBalance> {
    try {
      console.log('accountId', accountId);
      console.log('Data formatada', date);
      const balance = await this.consolidateBalanceModel.findOne({
        accountId,
        date,
      });

      console.log('Balanço', balance);

      return balance;
    } catch (error) {
      throw new BadRequestException('Dados inválidos');
    }
  }
}
