import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KafkaService } from '../kafka/kafka.service';
import { CreateTransactionDto } from './dto/transactions.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    private readonly kafkaService: KafkaService,
  ) {}

  async createTransaction(
    transaction: CreateTransactionDto,
  ): Promise<Transaction> {
    try {
      const newTransaction = await this.transactionsRepository.create(
        transaction,
      );
      const savedTransaction = await this.transactionsRepository.save(
        newTransaction,
      );
      await this.kafkaService.newTransaction(savedTransaction);
      return savedTransaction;
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('Transação não concluída.');
    }
  }
}
