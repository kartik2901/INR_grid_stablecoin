
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User)
		private userModel: typeof User,
	) { }

	async createUser(createData: { email: string; firstName: string; password: string; verificationCode?: string }): Promise<User> {
		const existingUser = await this.userModel.findOne({ where: { email: createData.email } });
		if (existingUser) {
		  throw new HttpException('Email already registered', HttpStatus.BAD_REQUEST);
		}
	
		const newUser = await this.userModel.create(createData);
		return newUser;
	  }
	

	async updateUserProfile(
		userId: string,
		updateData: {
		  firstName: string;
		  middleName?: string;
		  lastName: string;
		  phone?: string;
		  panNumber: string;
		  aadharNumber: string;
		},
	  ): Promise<User> {
		const user = await this.userModel.findByPk(userId);
	
		if (!user) {
		  throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
	
		user.firstName = updateData.firstName;
		user.middleName = updateData.middleName || user.middleName;
		user.lastName = updateData.lastName;
		user.phone = updateData.phone || user.phone;
		user.panNumber = updateData.panNumber;
		user.aadharNumber = updateData.aadharNumber;
		user.isKycCompleted = true;
	
		await user.save(); // Save the updated user information to the database
		return user;
	  }

	async findByEmail(email: string): Promise<User> {
		return this.userModel.findOne({ where: { email } });
	}

	async findByVerificationCode(code: string): Promise<User> {
		return this.userModel.findOne({ where: { verificationCode: code } });
	}

	async findByResetCode(code: string): Promise<User> {
		return this.userModel.findOne({ where: { resetCode: code } });
	}

	async findByEmailAndVerificationCode(email: string, code: string): Promise<User> {
		return this.userModel.findOne({ where: { email, verificationCode: code } });
	}

	async verifyUser(id: string): Promise<any> {
		return this.userModel.update(
			{ isEmailVerified: true, verificationCode: null },
			{ where: { id } }
		);
	}
	async updateResetCode(id: string, resetCode: string): Promise<any> {
		return this.userModel.update({ resetCode }, { where: { id } });
	}

	async updatePassword(id: string, password: string): Promise<any> {
		return this.userModel.update({ password, resetCode: null }, { where: { id } });
	}

	// async createFromGoogle(profile: any): Promise<User> {
	// 	const { id: googleId, emails } = profile;
	// 	const email = emails[0].value;
	// 	return this.createUser({ email, googleId, isEmailVerified: true });
	// }
}
