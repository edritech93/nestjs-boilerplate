import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { MessageModel } from 'src/libs/message.model';
import { CreateOtpDto } from './dto/create-otp.dto';
import { getRandomOtp } from './libs/get-otp';
import { MailerService } from 'src/mailer/mailer.service';
import { getSignUpEmail } from './template/sign-up.email';
import { TypeOtpEnum } from './libs/type-otp.enum';
import { getForgotPasswordEmail } from './template/forgot-password.email';
import { ValidateOtpDto } from './dto/validate-otp.dto';
import Mail from 'nodemailer/lib/mailer';

@Controller('otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('send-email')
  async sendOtp(@Body() createOtpDto: CreateOtpDto): Promise<MessageModel> {
    const { email, typeOtp } = createOtpDto;
    const dataExist = await this.otpService.findAllByEmail(email);
    if (dataExist.length > 0) {
      for (let i = 0; i < dataExist.length; i++) {
        const item = dataExist[i];
        await this.otpService.remove(item.id);
      }
    }
    const otp = getRandomOtp();
    const bodySave: CreateOtpDto = {
      ...createOtpDto,
      codeOtp: otp,
    };
    await this.otpService.create(bodySave);
    let bodyHtml = '';
    let subjectEmail = '';
    if (typeOtp === TypeOtpEnum.signUp) {
      subjectEmail = 'Account Activation OTP';
      bodyHtml = getSignUpEmail(email, otp);
    } else if (typeOtp === TypeOtpEnum.forgotPassword) {
      subjectEmail = 'Forgot Password OTP';
      bodyHtml = getForgotPasswordEmail(email, otp);
    }
    const bodyEmail: Mail.Options = {
      to: email,
      subject: subjectEmail,
      html: bodyHtml,
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
      return { message: 'OTP valid' };
    } else {
      throw new BadRequestException({ message: 'OTP invalid' });
    }
  }
}
