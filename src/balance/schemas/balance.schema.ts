import { Schema, Document, Types } from 'mongoose';

export interface IConsolidateBalance extends Document {
  accountId: number;
  amount: Types.Decimal128;
  date: Date;
}

export const ConsolidateBalanceSchema = new Schema<IConsolidateBalance>(
  {
    accountId: { type: Number, required: true },
    amount: { type: Schema.Types.Decimal128, required: true },
    date: { type: Date, required: true },
  },
  { collection: 'consolidated_balance', minimize: false },
);
