
import Web3 from 'web3';
import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { OrderCbdc } from './order-cbdc.model';
import { OrderInrc } from './order-incr.model';
import { ABI } from './abi';

@Injectable()
export class OrderService {
	constructor(
		@InjectModel(Order)
		private readonly orderModel: typeof Order,
		@InjectModel(OrderCbdc)
		private readonly orderCbdc: typeof OrderCbdc,
		@InjectModel(OrderInrc)
		private readonly orderInrcModel: typeof OrderInrc,
	) { }


	async burnOnWithdrawal(userId: string, userAddress: string, amount: string) {
		
		try {
			const web3 = new Web3(process.env.INFURA_URL);
			const contract = new web3.eth.Contract(
				ABI,   
				process.env.CONTRACT_ADDRESS 
			);

			const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
			const adminAddress = process.env.ADMIN_ADDRESS;

			// Convert amount to smallest units (e.g., Wei)
			const amountInWei = web3.utils.toWei(amount, 'mwei');

			// Encode the contract method data for BURN_ON_WITHDRAWAL
			const txData = contract.methods.BURN_ON_WITHDRAWAL(userAddress, amountInWei).encodeABI();

			// Get the nonce for the admin account
			const nonce = await web3.eth.getTransactionCount(adminAddress, 'pending');

			// Estimate the gas required for the transaction
			const gasLimit = await contract.methods.BURN_ON_WITHDRAWAL(userAddress, amountInWei).estimateGas({
				from: adminAddress,
			});

			// Get the current gas price
			const gasPrice = await web3.eth.getGasPrice();

			// Create the transaction object
			const tx = {
				from: adminAddress,
				to: process.env.CONTRACT_ADDRESS,  // Contract address
				data: txData,
				gas: web3.utils.toHex(gasLimit),
				gasPrice: web3.utils.toHex(gasPrice),
				nonce: web3.utils.toHex(nonce),
				value: '0x0',  // Set value to 0 since no Ether is being sent
			};

			// Sign the transaction
			const signedTx = await web3.eth.accounts.signTransaction(tx, adminPrivateKey);

			// Send the signed transaction
			const receipt: any = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

			console.log('Transaction receipt:', receipt);

			// Save the transaction details to the database
			const savedOrder = await this.orderInrcModel.create({
				transactionHash: receipt.transactionHash,
				userId,
				userAddress,
				amount: parseFloat(amount),   
				chain: 'Ethereum',
				purpose: 'Burn INRC Tokens',
				transactionType: 'Withdraw',
				status: 'Done',  // Initially mark as done
			});

			return {
				message: 'INRC burned successfully',
				transactionHash: receipt.transactionHash,
			};
		} catch (error) {
			console.error('Error during withdrawal:', error.response?.data || error.message);
			throw new Error(error.response?.data || 'Failed to process withdrawal');
		}
	}


	async createCashfreeOrder(
		userId: string,
		linkId: string,
		linkAmount: number,
		linkCurrency: string,
		linkPurpose: string,
		customerDetails: any,
		linkPartialPayments: boolean = false,
		linkMinimumPartialAmount?: number,
		linkExpiryTime?: string,
		linkNotify?: { send_sms: boolean; send_email: boolean },
		linkAutoReminders: boolean = false,
		linkNotes?: { [key: string]: string },
		linkMeta?: any
	) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'x-client-id': process.env.CASHFREE_CLIENT_ID,
				'x-client-secret': process.env.CASHFREE_CLIENT_SECRET,
				'x-api-version': '2023-08-01',
			},
		};
		const expiryTime = linkExpiryTime || this.addDaysToCurrentDate(30);
		const data = {
			link_id: linkId,
			link_amount: linkAmount,
			link_currency: linkCurrency || 'INR',
			link_purpose: linkPurpose,
			customer_details: {
				customer_name: customerDetails.customer_name,
				customer_email: customerDetails.customer_email,
				customer_phone: customerDetails.customer_phone,
			},
			link_partial_payments: linkPartialPayments,
			link_minimum_partial_amount: linkMinimumPartialAmount || null,
			link_expiry_time: expiryTime,
			link_notify: linkNotify || { send_sms: true, send_email: true },
			link_auto_reminders: linkAutoReminders,
			link_notes: linkNotes || {},
			link_meta: linkMeta || {},
		};

		console.log("Creating order with data:", data);
		try {

			const response = await axios.post(
				'https://sandbox.cashfree.com/pg/links',
				data,
				config,
			);

			const savedOrder = await this.orderCbdc.create({
				userId: userId,
				orderId: linkId,
				amount: linkAmount,
				currency: linkCurrency,
				purpose: 'Purchase INRC',
				customerDetails: customerDetails,
				partialPayments: linkPartialPayments,
				minimumPartialAmount: linkMinimumPartialAmount || null,
				expiryTime: new Date(expiryTime),
				notify: linkNotify || { send_sms: true, send_email: true },
				autoReminders: linkAutoReminders,
				notes: linkNotes || {},
				meta: linkMeta || {},
				paymentLink: response.data.payment_link,  // Assuming Cashfree returns this
			});

			console.log("Order created successfully:", response.data);
			return response.data;
		} catch (error) {
			console.error("Error creating order:", error.response?.data || error.message);
			throw new Error(error.response?.data || 'Failed to create order');
		}
	}


	async createCbdcOrder(
		userId: string,
		linkId: string,
		linkAmount: number,
		linkCurrency: string,
		linkPurpose: string,
		customerDetails: any,
		linkPartialPayments: boolean = false,
		linkMinimumPartialAmount?: number,
		linkExpiryTime?: string,
		linkNotify?: { send_sms: boolean; send_email: boolean },
		linkAutoReminders: boolean = false,
		linkNotes?: { [key: string]: string },
		linkMeta?: any
	) {
		try {
			const savedOrder = await this.orderCbdc.create({
				userId: userId,
				orderId: linkId,
				amount: linkAmount,
				currency: linkCurrency,
				purpose: 'Purchase INRC',
				customerDetails: customerDetails,
				partialPayments: linkPartialPayments,
				minimumPartialAmount: linkMinimumPartialAmount || null,
				expiryTime: new Date(),
				notify: linkNotify || { send_sms: true, send_email: true },
				autoReminders: linkAutoReminders,
				notes: linkNotes || {},
				meta: linkMeta || {},
				paymentLink: "",  // Assuming Cashfree returns this
			});
			console.log("Order created successfully:", savedOrder);
			return savedOrder;
		} catch (error) {
			console.error("Error creating order:", error.response?.data || error.message);
			throw new Error(error.response?.data || 'Failed to create order');
		}
	}

	async createInrcOrder(
		userId: string,
		amount: string,
		userAddress: string,
	) {
		try {
			const web3 = new Web3(process.env.INFURA_URL);
			const contract = new web3.eth.Contract(ABI, process.env.CONTRACT_ADDRESS);
			const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
			const adminAddress = process.env.ADMIN_ADDRESS;
			const amountInWei = web3.utils.toWei(amount, 'mwei');
			const txData = contract.methods.INRC_ISSUE(userAddress, amountInWei).encodeABI();

			// Get nonce for the admin address
			const nonce = await web3.eth.getTransactionCount(adminAddress, 'pending');

			// Estimate gas limit for the transaction
			const gasLimit = await contract.methods.INRC_ISSUE(userAddress, amountInWei).estimateGas({
				from: adminAddress,
			});

			// Get current gas price
			const gasPrice = await web3.eth.getGasPrice();

			// Transaction object
			const tx = {
				from: adminAddress,
				to: process.env.CONTRACT_ADDRESS,  // Contract address
				data: txData,
				gas: web3.utils.toHex(gasLimit),  // Convert gas limit to hex
				gasPrice: web3.utils.toHex(gasPrice),  // Convert gas price to hex
				nonce: web3.utils.toHex(nonce),  // Convert nonce to hex
				value: '0x0',  // Set value explicitly to 0 in hex
			};

			// Sign the transaction with the admin private key
			const signedTx = await web3.eth.accounts.signTransaction(tx, adminPrivateKey);
			console.log("🚀 ~ OrderService ~ signedTx:", signedTx)

			// Send the signed transaction
			const receipt: any = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
			console.log('Transaction receipt:', receipt);

			// Save the transaction details to the database
			const savedOrder = await this.orderInrcModel.create({
				transactionHash: receipt.transactionHash,
				userId,
				userAddress,
				amount: parseFloat(amount),  // Store the amount in your model's format
				chain: 'Ethereum',
				purpose: 'Mint INRC Tokens',
				transactionType: 'Deposit',
				status: 'Done',  // Mark as done initially
			});

			return {
				message: 'INRC issued successfully',
				transactionHash: receipt.transactionHash,
			};
		} catch (error) {
			console.log("🚀 ~ OrderService ~ error:", error)
			console.error("Error creating order:", error.response?.data || error.message);
			throw new Error(error.response?.data || 'Failed to create order');
		}
	}


	async getOrdersByUserId(userId: string): Promise<Order[]> {
		try {
			console.log(`Fetching orders for userId: ${userId}`);

			const orders = await this.orderModel.findAll({
				where: { userId },
			});

			console.log(`Orders found: ${JSON.stringify(orders)}`);

			if (!orders || orders.length === 0) {
				console.log(`No orders found for userId: ${userId}`);
				throw new Error('No orders found for this user');
			}

			console.log(`Found ${orders.length} order(s) for userId: ${userId}`);
			return orders;
		} catch (error) {
			// console.error(`Error retrieving orders for userId: ${userId}`, error); 
			throw new Error(`Failed to retrieve orders: ${error.message}`);
		}
	}

	async getCbdcOrdersByUserId(userId: string): Promise<Order[]> {
		try {
			console.log(`Fetching orders for userId: ${userId}`);

			const orders = await this.orderCbdc.findAll({
				where: { userId },
			});

			console.log(`Orders found: ${JSON.stringify(orders)}`);

			if (!orders || orders.length === 0) {
				console.log(`No orders found for userId: ${userId}`);
				throw new Error('No orders found for this user');
			}

			console.log(`Found ${orders.length} order(s) for userId: ${userId}`);
			return orders;
		} catch (error) {
			// console.error(`Error retrieving orders for userId: ${userId}`, error); 
			throw new Error(`Failed to retrieve orders: ${error.message}`);
		}
	}


	async getInrcOrdersByUserId(userId: string): Promise<OrderInrc[]> {
		try {
			console.log(`Fetching orders for userId: ${userId}`);
			const orders = await this.orderInrcModel.findAll({
				where: { userId },
			});
			console.log(`Orders found: ${JSON.stringify(orders)}`);
			if (!orders || orders.length === 0) {
				console.log(`No orders found for userId: ${userId}`);
				throw new Error('No orders found for this user');
			}
			console.log(`Found ${orders.length} order(s) for userId: ${userId}`);
			return orders;
		} catch (error) {
			// console.error(`Error retrieving orders for userId: ${userId}`, error); 
			throw new Error(`Failed to retrieve orders: ${error.message}`);
		}
	}


	



	addDaysToCurrentDate(days: number): string {
		const date = new Date();
		date.setDate(date.getDate() + days);
		return date.toISOString();
	}
}
