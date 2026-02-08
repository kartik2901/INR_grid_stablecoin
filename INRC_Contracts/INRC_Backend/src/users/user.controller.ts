import { Controller, Post, Patch, Body, Param, HttpException, HttpStatus, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Route to create a new user
  @Post('create')
  async createUser(@Body() body: any) {
    const { email, firstName, middleName, lastName, phone, panNumber, aadharNumber, password } = body;

    try {
      const newUser = await this.usersService.createUser({
        email,
        firstName,
        password,
      });

      return { message: 'User created successfully', newUser };
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to create user', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Route to update user profile
  @Post('update/:id')
  async updateUserProfile(
    @Param('id') userId: string,
    @Body() body: any
  ) {
    const { firstName, middleName, lastName, phone, panNumber, aadharNumber } = body;

    try {
      const updatedUser = await this.usersService.updateUserProfile(userId, {
        firstName,
        middleName,
        lastName,
        phone,
        panNumber,
        aadharNumber,
      });

      return { message: 'User profile updated successfully', updatedUser };
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to update user profile', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
