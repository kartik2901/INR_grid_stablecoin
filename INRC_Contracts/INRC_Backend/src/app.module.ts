
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
 
import { User } from './users/user.model';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { KycModule } from './kyc/kyc.module';
import { TransactionModule } from './transaction/transaction.module';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    MailModule,
    KycModule,
    TransactionModule
  ],
})
export class AppModule {}
    