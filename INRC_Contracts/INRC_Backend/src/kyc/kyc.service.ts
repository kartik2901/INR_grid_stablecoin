import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Kyc } from './kyc.model';
import axios from 'axios';

@Injectable()
export class KycService {
  private readonly cashfreeBaseUrl = process.env.CASHFREE_API_BASE_URL;
  private readonly clientId = process.env.CASHFREE_CLIENT_ID;
  private readonly clientSecret = process.env.CASHFREE_CLIENT_SECRET;

  constructor(
    @InjectModel(Kyc)
    private kycModel: typeof Kyc,
  ) { }

  /**
   * Helper function to authenticate with Cashfree and get a token
   */
  private async getCashfreeToken(): Promise<string> {
    try {
      const response = await axios.post(`${this.cashfreeBaseUrl}/auth/token`, {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      });

      return response.data.token;
    } catch (error) {
      throw new HttpException(
        `Error authenticating with Cashfree: ${error.message}`,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /**
   * Submit KYC for a user to Cashfree and store locally
   * @param userid The ID of the user submitting KYC
   * @param userData The KYC data (documentType, documentNumber, etc.)
   * @returns The KYC record created
   */
  async submitKyc(userid: string, userData: any): Promise<Kyc> {
    try {
      // Get Cashfree auth token
      const token = await this.getCashfreeToken();

      // Make API call to Cashfree to submit KYC
      const cashfreeResponse = await axios.post(
        `${this.cashfreeBaseUrl}/kyc/submit`,
        {
          documentType: userData.documentType,
          documentNumber: userData.documentNumber,
          userId: userid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (cashfreeResponse.data.status !== 'success') {
        throw new Error('Failed to submit KYC to Cashfree.');
      }

      // Store the KYC record in the local database
      const kycRecord = await this.kycModel.create({
        userid,
        documentType: userData.documentType,
        documentNumber: userData.documentNumber,
        status: 'pending', // Set the initial status to 'pending'
      });

      return kycRecord;
    } catch (error) {
      throw new HttpException(
        `Error submitting KYC: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Update the KYC status for a user with Cashfree API integration
   * @param userid The ID of the user whose KYC is being updated
   * @param status The new status of KYC ('approved' or 'rejected')
   * @param rejectionReason The reason for rejection (optional, only if status is 'rejected')
   */
  async updateKycStatus(userid: string, status: string, rejectionReason?: string): Promise<void> {
    const kycRecord = await this.kycModel.findOne({ where: { userid } });

    if (!kycRecord) {
      throw new HttpException('KYC record not found', HttpStatus.NOT_FOUND);
    }

    try {
      // Get Cashfree auth token
      const token = await this.getCashfreeToken();

      // Make API call to Cashfree to update KYC status
      const cashfreeResponse = await axios.post(
        `${this.cashfreeBaseUrl}/kyc/update-status`,
        {
          userid,
          status,
          rejectionReason: status === 'rejected' ? rejectionReason : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (cashfreeResponse.data.status !== 'success') {
        throw new Error('Failed to update status on Cashfree.');
      }

      // Update local KYC record status
      kycRecord.status = status;
      if (status === 'rejected' && rejectionReason) {
        kycRecord.rejectionReason = rejectionReason;
      } else if (status === 'approved') {
        kycRecord.rejectionReason = null; // Clear the rejection reason if it's approved
      }

      kycRecord.updatedAt = new Date();

      await kycRecord.save();
    } catch (error) {
      throw new HttpException(
        `Error updating KYC status: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Get the KYC status of a user
   * @param userid The ID of the user whose KYC status is being fetched
   * @returns The KYC record for the user
   */
  async getKycStatus(userid: string): Promise<Kyc> {
    try {
      const kycRecord = await this.kycModel.findOne({ where: { userid } });

      if (!kycRecord) {
        throw new HttpException('KYC record not found', HttpStatus.NOT_FOUND);
      }

      return kycRecord;
    } catch (error) {
      throw new HttpException(
        `Error fetching KYC status: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

