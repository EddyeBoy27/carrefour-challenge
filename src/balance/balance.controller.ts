import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as moment from 'moment';
import { BalanceService } from './balance.service';
import { BalanceDTO } from './dto/balance.dto';
import { IConsolidateBalance } from './schemas/balance.schema';

@UseGuards(AuthGuard())
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  async getConsolidatedBalance(
    @Body() body: BalanceDTO,
  ): Promise<IConsolidateBalance> {
    const { accountId, date } = body;
    const formattedDate = moment(date, 'DD/MM/YYYY').format('YYYY/MM/DD');

    const consolidatedBalance =
      await this.balanceService.getConsolidatedBalance(
        accountId,
        formattedDate,
      );
    return consolidatedBalance;
  }
}
