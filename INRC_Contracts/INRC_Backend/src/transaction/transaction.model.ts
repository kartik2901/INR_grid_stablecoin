import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table
export class Transaction extends Model<Transaction> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.DECIMAL(10, 2),  // Store INR amount
    allowNull: false,
  })
  inrAmount: number;

  @Column({
    type: DataType.DECIMAL(10, 6),  // Store Crypto amount
    allowNull: false,
  })
  cryptoAmount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  paymentMethod: string;  // Store the payment method, e.g., 'Credit/Debit', 'UPI', 'CBDC'

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;  // E.g., 'pending', 'completed', 'failed'

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;  // Store the user who made the transaction

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  orderId: string;  // Cashfree or another gateway order ID if relevant

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;
}
