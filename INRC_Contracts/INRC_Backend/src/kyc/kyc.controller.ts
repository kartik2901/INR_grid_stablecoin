import { Controller, Post, Get, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { KycService } from './kyc.service';

@Controller('kyc')
export class KycController {
    constructor(private readonly kycService: KycService) { }

    @Post('submit/:userid')
    async submitKyc(@Param('userid') userid: string, @Body() userData: any) {
        try {
            const result = await this.kycService.submitKyc(userid, userData);
            return {
                message: 'KYC submission successful',
                data: result,
            };
        } catch (error) {
            throw new HttpException(
                error.message || 'KYC submission failed',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('status/:userid')
    async checkKycStatus(@Param('userid') userid: string) {
        try {
            const result = await this.kycService.getKycStatus(userid);
            return {
                message: 'KYC status fetched successfully',
                data: result,
            };
        } catch (error) {
            throw new HttpException(
                error.message || 'KYC status check failed',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Post('update-status/:userid')
    async updateKycStatus(
        @Param('userid') userid: string,
        @Body('status') status: string,
        @Body('rejectionReason') rejectionReason?: string,
    ) {
        try {
            await this.kycService.updateKycStatus(userid, status, rejectionReason);
            return { message: 'KYC status updated successfully' };
        } catch (error) {
            throw new HttpException(
                error.message || 'KYC status update failed',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
