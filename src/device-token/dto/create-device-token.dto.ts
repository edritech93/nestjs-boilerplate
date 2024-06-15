import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TypeDeviceEnum } from '../libs/type-device.enum';

export class CreateDeviceTokenDto {
  id?: number;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsEnum(TypeDeviceEnum)
  @IsNotEmpty()
  deviceType: TypeDeviceEnum;

  userId: number;
}
