import { IsNotEmpty, IsString } from 'class-validator';

export class UsersModel {
  id: number;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  avatar: string;
}
