import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionService } from 'src/transaction/transaction.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('callback')
  async paymentCallback(@Body() body) {
    const { order_id, txStatus } = body;

    // Fetch the transaction by the order ID
    const transaction = await this.transactionService.getTransactionById(order_id);
    if (!transaction) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }

    // Update the transaction status
    const status = txStatus === 'SUCCESS' ? 'completed' : 'failed';
    await this.transactionService.updateTransactionStatus(transaction.id, status);

    return { message: 'Transaction updated successfully' };
  }
}
