import { Controller, Post, Body, Req, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import axios from 'axios';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('buy')
  async buyCrypto(@Body() body) {
    const { userId, inrAmount, cryptoAmount, paymentMethod, customerDetails } = body;

    // Create the transaction in your database
    const transaction = await this.transactionService.createTransaction(userId, inrAmount, cryptoAmount, paymentMethod);

    // Create the order with Cashfree (or another gateway)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': process.env.CASHFREE_CLIENT_ID,
        'x-client-secret': process.env.CASHFREE_CLIENT_SECRET,
      },
    };

    const data = {
      order_id: `order_${Date.now()}`, // Unique order ID
      order_amount: inrAmount, // Amount in INR
      order_currency: 'INR',
      customer_details: customerDetails,
      order_note: 'INRC Purchase',
      notify_url: 'https://your-backend.com/payment/callback', // Update with actual callback URL
    };

    try {
      const response = await axios.post(
        'https://sandbox.cashfree.com/pg/orders', // Sandbox URL, switch to production for live
        data,
        config
      );

      // Update the transaction with order ID and mark status as "pending"
      await this.transactionService.updateTransactionStatus(transaction.id, 'pending', response.data.order_id);

      return {
        message: 'Order created successfully',
        orderDetails: response.data,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to create order', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
