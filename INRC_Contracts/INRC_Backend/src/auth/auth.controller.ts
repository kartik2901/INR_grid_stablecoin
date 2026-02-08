import { Controller, Post, Body, Req, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	usersService: any;
	jwtService: any;
	constructor(private readonly authService: AuthService) { }

	@Post('signup')
	async signup(
		@Body('email') email: string,
		@Body('password') password: string,
		@Body('fullname') fullname: string,
	) {
		try {
			const { token, user } = await this.authService.signup(email, password, fullname);
			return {
				message: 'Signup successful. Please verify your email.',
				token,
				user,
			};
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: error.message || 'Signup failed',
				},
				HttpStatus.BAD_REQUEST
			);
		}
	}



	@Post('verify-email')
	async verifyEmail(@Body('email') email: string, @Body('code') code: string) {
		try {
			await this.authService.verifyEmail(email, code);
			return { message: 'Email verified successfully.' };
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					message: error.message || 'Email verification failed',
				},
				HttpStatus.BAD_REQUEST
			);
		}
	}


	@Post('login')
	async login(@Body('email') email: string, @Body('password') password: string) {
		try {
			const { token, user } = await this.authService.login(email, password);
			return {
				message: 'Login successful',
				token,
				user,
			};
		} catch (error) {
			throw new HttpException(
				error.message || 'Login failed',
				HttpStatus.UNAUTHORIZED,
			);
		}
	}


	@Post('forgot-password')
	async forgotPassword(@Body('email') email: string) {
		try {
			await this.authService.forgotPassword(email);
			return { message: 'Password reset code sent to your email.' };
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: error.message || 'Forgot password request failed',
				},
				HttpStatus.BAD_REQUEST
			);
		}
	}

	@Post('reset-password')
	async resetPassword(@Body('resetCode') resetCode: string, @Body('newPassword') newPassword: string) {
		try {
			await this.authService.resetPassword(resetCode, newPassword);
			return { message: 'Password reset successful.' };
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: error.message || 'Password reset failed',
				},
				HttpStatus.BAD_REQUEST
			);
		}
	}
}
