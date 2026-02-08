import { Controller, Post, Body, HttpException, HttpStatus, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from 'sequelize';

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) { }

	@Post('create')
	async createCashfreeOrder(@Body() body) {
		try {
			// Destructure values from the request body using snake_case to match frontend payload
			const {
				userId: userId,
				link_id: linkId,  // Adjust for snake_case
				link_amount: linkAmount,  // Adjust for snake_case
				link_currency: linkCurrency,
				link_purpose: linkPurpose,
				customer_details: customerDetails,
				link_partial_payments: linkPartialPayments,
				link_minimum_partial_amount: linkMinimumPartialAmount,
				link_expiry_time: linkExpiryTime,
				link_notify: linkNotify,
				link_auto_reminders: linkAutoReminders,
				link_notes: linkNotes,
				link_meta: linkMeta,
			} = body;

			// Log the request body for debugging purposes
			console.log('Received request body:', body);

			// Validate customerDetails
			if (!customerDetails || !customerDetails.customer_name || !customerDetails.customer_email || !customerDetails.customer_phone) {
				throw new HttpException(
					'Customer details (customer_name, customer_email, customer_phone) are required',
					HttpStatus.BAD_REQUEST,
				);
			}

			// Pass the dynamic values to the service
			const result = await this.orderService.createCashfreeOrder(
				userId,
				linkId, // link_id from frontend
				linkAmount, // link_amount from frontend
				linkCurrency, // link_currency from frontend
				linkPurpose, // link_purpose from frontend
				customerDetails, // customer details object from frontend
				linkPartialPayments, // link_partial_payments from frontend (optional)
				linkMinimumPartialAmount, // link_minimum_partial_amount from frontend (optional)
				linkExpiryTime, // link_expiry_time from frontend (optional)
				linkNotify, // link_notify from frontend (optional)
				linkAutoReminders, // link_auto_reminders from frontend (optional)
				linkNotes, // link_notes from frontend (optional)
				linkMeta, // link_meta from frontend (optional)
			);

			return result;
		} catch (error) {
			throw new HttpException(
				{ message: 'Failed to create Cashfree order', error: error.message },
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	@Post('create/cbdc')
	async createCBDCOrder(@Body() body) {
		try {
			// Destructure values from the request body using snake_case to match frontend payload
			const {
				userId: userId,
				link_id: linkId,  // Adjust for snake_case
				link_amount: linkAmount,  // Adjust for snake_case
				link_currency: linkCurrency,
				link_purpose: linkPurpose,
				customer_details: customerDetails,
				link_partial_payments: linkPartialPayments,
				link_minimum_partial_amount: linkMinimumPartialAmount,
				link_expiry_time: linkExpiryTime,
				link_notify: linkNotify,
				link_auto_reminders: linkAutoReminders,
				link_notes: linkNotes,
				link_meta: linkMeta,
			} = body;

			// Log the request body for debugging purposes
			console.log('Received request body:', body);

			// Validate customerDetails
			if (!customerDetails || !customerDetails.customer_name || !customerDetails.customer_email || !customerDetails.customer_phone) {
				throw new HttpException(
					'Customer details (customer_name, customer_email, customer_phone) are required',
					HttpStatus.BAD_REQUEST,
				);
			}

			// Pass the dynamic values to the service
			const result = await this.orderService.createCbdcOrder(
				userId,
				linkId, // link_id from frontend
				linkAmount, // link_amount from frontend
				linkCurrency, // link_currency from frontend
				linkPurpose, // link_purpose from frontend
				customerDetails, // customer details object from frontend
				linkPartialPayments, // link_partial_payments from frontend (optional)
				linkMinimumPartialAmount, // link_minimum_partial_amount from frontend (optional)
				linkExpiryTime, // link_expiry_time from frontend (optional)
				linkNotify, // link_notify from frontend (optional)
				linkAutoReminders, // link_auto_reminders from frontend (optional)
				linkNotes, // link_notes from frontend (optional)
				linkMeta, // link_meta from frontend (optional)
			);

			return result;
		} catch (error) {
			throw new HttpException(
				{ message: 'Failed to create Cashfree order', error: error.message },
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	@Post('/burn/user/amount/withdrawal/order')
	async burnWithdrawal(@Body() body) {
	  const { userId, userAddress, amount } = body;
	  console.log("🚀 ~ OrderService ~ burnOnWithdrawal ~ amount:", amount)
	  console.log("🚀 ~ OrderService ~ burnOnWithdrawal ~ userAddress:", userAddress)
	  console.log("🚀 ~ OrderService ~ burnOnWithdrawal ~ userId:", userId)
	  // Validate the required fields
	  if (!userId || !userAddress || !amount) {
		throw new HttpException(
		  'userId, userAddress, and amount are required',
		  HttpStatus.BAD_REQUEST
		);
	  }
  
	  // Call the service method to interact with the smart contract
	  return await this.orderService.burnOnWithdrawal(userId, userAddress, amount);
	}

	@Post('create/inrc/mint/order')
	async createInrcOrder(@Body() body) {
		try {
			const {
				userId: userId,
				amount: amount,  
				userAddress: userAddress,
			} = body;

			 
			// Pass the dynamic values to the service
			const result = await this.orderService.createInrcOrder(
				userId,
				amount,
				userAddress
			);

			return result;
		} catch (error) {
			throw new HttpException(
				{ message: 'Failed to create INRC order', error: error.message },
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	@Get(':userId')
	async getOrdersByUserId(@Param('userId') userId: string): Promise<Order[]> {
		try {
			const orders: any = await this.orderService.getOrdersByUserId(userId);
			return orders;
		} catch (error) {
			throw new HttpException(
				{ message: `Error retrieving orders: ${error.message}` },
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	@Get('/create/cbdc/:userId')
	async getCbdcOrdersByUserId(@Param('userId') userId: string): Promise<Order[]> {
		try {
			const orders: any = await this.orderService.getCbdcOrdersByUserId(userId);
			return orders;
		} catch (error) {
			throw new HttpException(
				{ message: `Error retrieving orders: ${error.message}` },
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	@Get('/create/inrc/token/user/data/xyz/new/data/:userId')
	async getInrcOrdersByUserId(@Param('userId') userId: string): Promise<Order[]> {
		try {
			const orders: any = await this.orderService.getInrcOrdersByUserId(userId);
			return orders;
		} catch (error) {
			throw new HttpException(
				{ message: `Error retrieving orders: ${error.message}` },
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
