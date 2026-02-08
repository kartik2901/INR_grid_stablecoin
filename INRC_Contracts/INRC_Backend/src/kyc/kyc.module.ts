import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { KycService } from './kyc.service';
import { KycController } from './kyc.controller';
import { Kyc } from './kyc.model';

@Module({
  imports: [SequelizeModule.forFeature([Kyc])],
  providers: [KycService],
  controllers: [KycController],
})
export class KycModule {}
