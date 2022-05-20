import { IsNumber, IsString } from 'class-validator';

export class UserModel {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  lastName: string;
}
