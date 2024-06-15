import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAttachmentDto {
  id?: number;

  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  userId: number;
}
