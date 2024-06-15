import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { TypeOtpEnum } from '../libs/type-otp.enum';

export class CreateOtpDto {
  id: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  typeOtp: TypeOtpEnum;

  codeOtp: string;
}
