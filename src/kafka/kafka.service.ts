import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Kafka, Consumer, Producer } from 'kafkajs';
import { CreateTransactionDto } from '../transactions/dto/transactions.dto';
import { IConsolidateBalance } from '../balance/schemas/balance.schema';
import { Model } from 'mongoose';

@Injectable()
export class KafkaService {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor(
    @InjectModel('ConsolidatedBalance')
    private readonly consolidateBalanceModel: Model<IConsolidateBalance>,
  ) {
    this.kafka = new Kafka({
      clientId: 'kafka-client',
      brokers: ['kafka:9092'],
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'balance-group' });
  }

  async connect(): Promise<void> {
    await this.producer.connect();
    await this.consumer.connect();
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  async newTransaction(transaction: CreateTransactionDto): Promise<void> {
    const { accountId, createdAt, amount } = transaction;
    const transactionDate = new Date(createdAt);
    transactionDate.setHours(0, 0, 0, 0);

    const consolidatedBalance = await this.consolidateBalanceModel
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

    console.log('Saldo consolidado atualizado', consolidatedBalance);

    const createdTransaction = await this.consolidateBalanceModel.find();

    console.log('tudo da collection', createdTransaction);
  }
}
