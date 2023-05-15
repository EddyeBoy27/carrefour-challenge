import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsolidateBalanceSchema } from '../balance/schemas/balance.schema';
import { KafkaService } from './kafka.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ConsolidatedBalance', schema: ConsolidateBalanceSchema },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
