import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    async sendVerificationEmail(to: string, code: string): Promise<void> {
        const msg = {
            to,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject: 'Verify Your Email',
            text: `Please use the following code to verify your email: ${code}`,
        };

        try {
            await sgMail.send(msg);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            if (error.response) {
                console.error('SendGrid response:', error.response.body);
            }
        }
    }

    async sendResetPasswordEmail(to: string, resetCode: string): Promise<void> {
        const msg = {
            to,  // recipient's email
            from: process.env.SENDGRID_SENDER_EMAIL,  // Sender's verified email
            subject: 'Reset Your Password',
            text: `Please use the following code to reset your password: ${resetCode}`,
        };

        try {
            await sgMail.send(msg);
            console.log('Password reset email sent successfully');
        } catch (error) {
            console.error('Error sending password reset email:', error);
            if (error.response) {
                console.error('SendGrid response:', error.response.body);
            }
        }
    }
}
