import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsString()
  @IsNotEmpty()
  eventDescription: string;

  userId: number;
}
