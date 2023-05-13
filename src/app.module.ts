import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DebitModule } from './debit/debit.module';
import { CreditModule } from './credit/credit.module';
import { BalanceModule } from './balance/balance.module';
import { AuthService } from './auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import config from './config/typeorm.config';

@Module({
  imports: [
    AuthModule,
    DebitModule,
    CreditModule,
    BalanceModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRoot(config),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, AuthService],
})
export class AppModule {}
