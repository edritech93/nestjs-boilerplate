import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Validate,
  IsDateString,
} from 'class-validator';
import { IsUnique } from 'src/libs/is-unique';

export class CreateUserAuthDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  @Validate(IsUnique, ['userAuth', 'email'])
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;
}
