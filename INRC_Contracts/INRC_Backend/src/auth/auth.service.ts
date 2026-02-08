
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { MailService } from '../mail/mail.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UsersService,
		private mailService: MailService,
	) { }

	async signup(email: string, password: string, firstName: string): Promise<{ token: string, user: any }> {
		const existingUser = await this.userService.findByEmail(email);
		if (existingUser) {
			throw new UnauthorizedException('Email is already registered');
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

		// Create the user in the database
		const user:any = await this.userService.createUser({
			email,
			firstName,  // Store the firstName
			password: hashedPassword,
			verificationCode,
		});

		// Send verification email
		await this.mailService.sendVerificationEmail(email, verificationCode);

		// Generate JWT token
		const payload = { email: user.email, sub: user.id };
		const token = this.jwtService.sign(payload);

		// Return the token and user details
		return {
			token,
			user: {
				id: user.id,
				email: user.email,
				firstName: user.firstName,  // Return the firstName
				documentType: user.documentType,
			},
		};
	}

	async verifyEmail(email: string, code: string): Promise<void> {
		const user = await this.userService.findByEmailAndVerificationCode(email, code);
		if (!user) {
			throw new UnauthorizedException('Invalid verification code or email');
		}
		await this.userService.verifyUser(user.id);
	}

	async login(email: string, password: string): Promise<{ token: string, user: any }> {
		const user:any = await this.userService.findByEmail(email);
		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid credentials');
		}
		const payload = { email: user.email, sub: user.id };
		const token = this.jwtService.sign(payload);
		return {
			token,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				documentType: user.documentType,
			},
		};
	}

	async forgotPassword(email: string): Promise<void> {
		const user = await this.userService.findByEmail(email);
		if (!user) throw new Error('User not found');
		const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
		await this.userService.updateResetCode(user.id, resetCode);
		await this.mailService.sendResetPasswordEmail(email, resetCode);
	}

	async resetPassword(resetCode: string, newPassword: string): Promise<void> {
		const user = await this.userService.findByResetCode(resetCode);
		if (!user) throw new Error('Invalid reset code');
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		await this.userService.updatePassword(user.id, hashedPassword);
	}
}
