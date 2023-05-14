import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionType } from '../enum/transaction.enum';

@Entity({ name: 'transactions', schema: 'public' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account_id' })
  accountId: number;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  description: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;
}
