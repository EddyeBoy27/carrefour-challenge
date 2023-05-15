import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionsService } from '../transactions.service';
import { KafkaService } from '../../kafka/kafka.service';
import { CreateTransactionDto } from '../dto/transactions.dto';
import { Transaction } from '../entities/transaction.entity';
import { UnprocessableEntityException } from '@nestjs/common';

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;
  let transactionsRepositoryMock: jest.Mocked<any>;
  let kafkaServiceMock: jest.Mocked<KafkaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: {
            create: jest.fn().mockReturnValue({}),
            save: jest.fn().mockReturnValue({}),
          },
        },
        {
          provide: KafkaService,
          useValue: {
            newTransaction: jest.fn(),
          },
        },
      ],
    }).compile();

    transactionsService = module.get<TransactionsService>(TransactionsService);
    transactionsRepositoryMock = module.get(getRepositoryToken(Transaction));
    kafkaServiceMock = module.get(KafkaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTransaction', () => {
    it('should create and save a new transaction', async () => {
      const createTransactionDto = {
        accountId: 1,
        type: 'debit',
        amount: 10.5,
        description: 'Example transaction',
      } as CreateTransactionDto;

      await transactionsService.createTransaction(createTransactionDto);

      expect(transactionsRepositoryMock.create).toHaveBeenCalledWith(
        createTransactionDto,
      );
      expect(transactionsRepositoryMock.save).toHaveBeenCalled();
      expect(kafkaServiceMock.newTransaction).toHaveBeenCalled();
    });

    it('should throw an UnprocessableEntityException if transaction creation fails', async () => {
      const createTransactionDto = {
        accountId: 1,
        type: 'credit',
        amount: 10.55,
        description: 'Example transaction',
      } as CreateTransactionDto;

      transactionsRepositoryMock.save.mockRejectedValueOnce(new Error());

      await expect(
        transactionsService.createTransaction(createTransactionDto),
      ).rejects.toThrow(UnprocessableEntityException);
    });
  });
});
