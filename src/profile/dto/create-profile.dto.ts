import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateProfileDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;

  userId: number;
}
