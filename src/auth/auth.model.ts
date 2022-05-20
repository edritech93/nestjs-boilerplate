import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class AuthModel {
  id: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
