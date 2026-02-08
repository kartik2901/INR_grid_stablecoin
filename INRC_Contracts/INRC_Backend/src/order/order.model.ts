import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Order extends Model<Order> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  orderId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string; 

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currency: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  purpose: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  customerDetails: object;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  partialPayments: boolean;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  minimumPartialAmount: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiryTime: Date;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  notify: object;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  autoReminders: boolean;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  notes: object;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  meta: object;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  paymentLink: string;
}
