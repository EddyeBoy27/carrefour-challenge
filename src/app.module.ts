import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DebitModule } from './debit/debit.module';
import { CreditModule } from './credit/credit.module';
import { BalanceModule } from './balance/balance.module';

@Module({
  imports: [AuthModule, DebitModule, CreditModule, BalanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
