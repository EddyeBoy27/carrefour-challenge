import { Schema, Document, Types } from 'mongoose';

export interface IConsolidateBalance extends Document {
  accountId: number;
  amount: number;
  date: Date;
}

export const ConsolidateBalanceSchema = new Schema<IConsolidateBalance>(
  {
    accountId: { type: Number, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { collection: 'consolidated_balance' },
);
