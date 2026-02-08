import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller'; 
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'; 
import { ConfigModule } from '@nestjs/config';  

@Module({
  imports: [
    ConfigModule.forRoot(),  
    UsersModule,
    MailModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],  
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
