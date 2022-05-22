import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
