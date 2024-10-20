import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { TypeOtpEnum } from '../libs/type-otp.enum';

export class CreateOtpDto {
  id: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(TypeOtpEnum)
  @IsNotEmpty()
  typeOtp: TypeOtpEnum;

  codeOtp: string;
}
