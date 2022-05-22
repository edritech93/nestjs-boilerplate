import { IsString } from 'class-validator';

export class MessageModel {
  @IsString()
  message: string;
}
