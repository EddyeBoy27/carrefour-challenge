import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from '../balance.service';
import { IConsolidateBalance } from '../schemas/balance.schema';
import { getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';

describe('BalanceService', () => {
  let balanceService: BalanceService;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(mongoUri)],
      providers: [
        BalanceService,
        {
          provide: getModelToken('ConsolidatedBalance'),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    balanceService = module.get<BalanceService>(BalanceService);
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  describe('getConsolidatedBalance', () => {
    it('should return consolidated balance for the given accountId and date', async () => {
      const accountId = 1;
      const date = '2023-05-15';

      const balanceResult = {
        accountId: 111,
        date: new Date(),
        amount: 100,
      } as IConsolidateBalance;

      const consolidateBalanceModel = balanceService['consolidateBalanceModel'];

      jest
        .spyOn(consolidateBalanceModel, 'findOne')
        .mockResolvedValue(balanceResult);

      const result = await balanceService.getConsolidatedBalance(
        accountId,
        date,
      );

      expect(result).toEqual(balanceResult);

      expect(consolidateBalanceModel.findOne).toHaveBeenCalledWith(
        {
          accountId,
          date,
        },
        { _id: 0, __v: 0 },
      );
    });

    it('should throw BadRequestException if invalid data is provided', async () => {
      const accountId = 1;
      const date = 'invalid-date-format';

      const consolidateBalanceModel = balanceService['consolidateBalanceModel'];

      jest
        .spyOn(consolidateBalanceModel, 'findOne')
        .mockRejectedValue(new Error());

      await expect(
        balanceService.getConsolidatedBalance(accountId, date),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
