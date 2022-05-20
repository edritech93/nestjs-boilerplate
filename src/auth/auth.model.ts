import { IsNumber, IsString } from 'class-validator';

export class AuthModel {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsNumber()
  userId: number;
}
