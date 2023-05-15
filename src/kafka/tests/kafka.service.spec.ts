import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { KafkaService } from '../kafka.service';
import { CreateTransactionDto } from '../../transactions/dto/transactions.dto';

describe('KafkaService', () => {
  let kafkaService: KafkaService;
  let consolidateBalanceModelMock: jest.Mocked<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KafkaService,
        {
          provide: getModelToken('ConsolidatedBalance'),
          useValue: {
            findOneAndUpdate: jest.fn().mockReturnThis(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    kafkaService = module.get<KafkaService>(KafkaService);
    consolidateBalanceModelMock = module.get(
      getModelToken('ConsolidatedBalance'),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('newTransaction', () => {
    it('should update consolidate balance model with new transaction', async () => {
      const transaction = {
        accountId: 1,
        createdAt: new Date('2023-05-15T10:00:00Z'),
        amount: 100,
      } as CreateTransactionDto;
      const transactionDate = new Date(transaction.createdAt);
      transactionDate.setHours(0, 0, 0, 0);

      await kafkaService.newTransaction(transaction);

      expect(consolidateBalanceModelMock.findOneAndUpdate).toHaveBeenCalledWith(
        {
          accountId: transaction.accountId,
          date: transactionDate,
        },
        {
          $inc: { amount: transaction.amount },
        },
        {
          upsert: true,
          new: true,
        },
      );
    });
  });
});
