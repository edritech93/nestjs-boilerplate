import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserAuthDto {
  @IsString()
  @IsNotEmpty()
  codeOtp: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
