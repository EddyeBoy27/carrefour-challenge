import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTransactionDto } from './dto/transactions.dto';
import { TransactionsService } from './transactions.service';

@UseGuards(AuthGuard())
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async createTransaction(@Body() body: CreateTransactionDto): Promise<any> {
    await this.transactionsService.createTransaction(body);
  }
}
