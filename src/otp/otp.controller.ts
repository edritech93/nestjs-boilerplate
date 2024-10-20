import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { MessageModel } from 'src/libs/message.model';
import { CreateOtpDto } from './dto/create-otp.dto';
import { getRandomOtp } from './libs/get-otp';
import { MailerService } from 'src/mailer/mailer.service';
import { TypeOtpEnum } from './libs/type-otp.enum';
import { ValidateOtpDto } from './dto/validate-otp.dto';
import { ApiTags } from '@nestjs/swagger';
import { readFile } from 'fs';
import { promisify } from 'util';
import { join } from 'path';
import handlebars from 'handlebars';
import Mail from 'nodemailer/lib/mailer';

@ApiTags('OTP')
@Controller('v1/otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('send-email')
  async sendOtp(@Body() dto: CreateOtpDto): Promise<MessageModel> {
    const { email, typeOtp } = dto;
    const dataExist = await this.otpService.findAllByEmail(email);
    if (dataExist.length > 0) {
      for (let i = 0; i < dataExist.length; i++) {
        const item = dataExist[i];
        await this.otpService.remove(item.id);
      }
    }
    const otp = getRandomOtp();
    const bodySave: CreateOtpDto = {
      ...dto,
      codeOtp: otp,
    };
    await this.otpService.create(bodySave);
    let titleEmail = '';
    let textStart = '';
    let textEnd = '';
    let warmEnd = '';
    if (typeOtp === TypeOtpEnum.signUp) {
      titleEmail = 'Account Activation OTP';
      textStart =
        'Activate your Twillink account now! Enter the One-Time Password (OTP) below to get started:';
      textEnd =
        'Activate within the app and unlock a world of possibilities for connecting with clients and sharing your expertise. Reach out to our support team if you need any assistance during the process.';
      warmEnd =
        'Welcome to Twillink, the ultimate social media app for consultation!';
    } else if (typeOtp === TypeOtpEnum.forgotPassword) {
      titleEmail = 'Forgot Password OTP';
      textStart =
        'Forgot your Twillink account password? No worries! Enter the One-Time Password (OTP) below to reset your password:';
      textEnd =
        'Thank you for using Twillink, the ultimate consultation app for consultation!';
    }
    const pathTemplate = `${join(process.cwd())}/src/otp/template/template-1.html`;
    const readHtml = promisify(readFile);
    const html = await readHtml(pathTemplate, 'utf-8');
    const template = handlebars.compile(html);
    const data = {
      titleEmail,
      textStart,
      textEnd,
      warmEnd,
      otp,
      email,
    };
    const htmlToSend = template(data);
    const bodyEmail: Mail.Options = {
      to: email,
      subject: titleEmail,
      html: htmlToSend,
    };
    try {
      await this.mailerService.sendEmail(bodyEmail);
      return { message: 'Already send OTP to your email' };
    } catch (error) {
      throw new BadRequestException({ message: 'Invalid Email' });
    }
  }

  @Post('validate')
  async signUpOtp(
    @Body() validateOtpDto: ValidateOtpDto,
  ): Promise<MessageModel> {
    const { email, codeOtp } = validateOtpDto;
    const resOtp = await this.otpService.findOneByEmail(email);
    if (resOtp && resOtp.codeOtp === codeOtp) {
      if (codeOtp === TypeOtpEnum.signUp) {
        await this.otpService.remove(resOtp.id);
      }
      return { message: 'OTP valid' };
    } else {
      throw new BadRequestException({ message: 'OTP invalid' });
    }
  }
}
