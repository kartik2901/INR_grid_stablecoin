import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './transaction.model';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction)
    private transactionModel: typeof Transaction,
  ) {}

  async createTransaction(userId: string, inrAmount: number, cryptoAmount: number, paymentMethod: string): Promise<Transaction> {
    return this.transactionModel.create({
      userId,
      inrAmount,
      cryptoAmount,
      paymentMethod,
      status: 'pending',  // Initial status
    });
  }

  async updateTransactionStatus(transactionId: string, status: string, orderId?: string): Promise<void> {
    const transaction = await this.transactionModel.findByPk(transactionId);
    if (transaction) {
      transaction.status = status;
      if (orderId) transaction.orderId = orderId;
      await transaction.save();
    }
  }

  // Fetch transaction details if needed
  async getTransactionById(transactionId: string): Promise<Transaction> {
    return this.transactionModel.findByPk(transactionId);
  }
}
