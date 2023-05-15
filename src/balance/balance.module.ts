import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { ConsolidateBalanceSchema } from './schemas/balance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ConsolidatedBalance', schema: ConsolidateBalanceSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
