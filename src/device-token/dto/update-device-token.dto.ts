import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceTokenDto } from './create-device-token.dto';

export class UpdateDeviceTokenDto extends PartialType(CreateDeviceTokenDto) {}
