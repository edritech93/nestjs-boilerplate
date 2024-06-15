import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ValidateOtpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  codeOtp: string;
}
