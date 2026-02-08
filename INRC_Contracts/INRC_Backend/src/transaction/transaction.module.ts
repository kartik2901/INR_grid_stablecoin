import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Order } from 'src/order/order.model';
import { PaymentController } from 'src/order/payment.controller';
import { OrderService } from 'src/order/order.service';
import { OrderController } from 'src/order/order.controller';
import { OrderCbdc } from 'src/order/order-cbdc.model';
import { OrderInrc } from 'src/order/order-incr.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Transaction, Order, OrderCbdc, OrderInrc]), 
  ],
  controllers: [TransactionController,OrderController, PaymentController], 
  providers: [TransactionService, OrderService], 
  exports: [TransactionService, OrderService], 
})
export class TransactionModule {}
