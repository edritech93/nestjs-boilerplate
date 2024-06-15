import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { getEmailFooterAttachment } from 'src/otp/template/attachment.email';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  mailTransport(): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
    const transport = nodemailer.createTransport({
      name: this.configService.get<string>('MAIL_HOST'),
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
      secure: this.configService.get<boolean>('MAIL_SECURE'),
      logger: true,
      debug: true,
      tls: {
        rejectUnauthorized: false,
      },
    });
    return transport;
  }

  async sendEmail(data: Mail.Options) {
    const { from, to, subject, html, attachments = [] } = data;
    const transport = this.mailTransport();
    await transport.verify().catch((error) => {
      console.log('Error Verify Email: ', error);
      throw error;
    });
    const options: Mail.Options = {
      from: from ?? {
        name: this.configService.get<string>('APP_NAME'),
        address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
      },
      to,
      subject,
      text: 'Hello. This email is from Photo Web',
      html,
      attachments: [...attachments, ...getEmailFooterAttachment()],
    };
    try {
      const result = await transport.sendMail(options);
      console.log('Success Send Email: ', result.accepted);
      return result;
    } catch (error) {
      console.log('Error Send Email: ', error);
      throw error;
    }
  }
}
