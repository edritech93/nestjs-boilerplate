import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DeviceTokenService } from './device-token.service';
import { CreateDeviceTokenDto } from './dto/create-device-token.dto';
import { JwtGuard } from '../user-auth/libs/jwt.guard';
import { GetUser } from '../libs/get-user.decorator';
import { UserAuth } from '../user-auth/entities/user-auth.entity';

@Controller('v1/device-token')
@UseGuards(JwtGuard)
export class DeviceTokenController {
  constructor(private readonly deviceTokenService: DeviceTokenService) {}

  @Post()
  async create(@Body() dto: CreateDeviceTokenDto, @GetUser() user: UserAuth) {
    try {
      const body: CreateDeviceTokenDto = {
        ...dto,
        userId: user.id,
      };
      await this.deviceTokenService.create(body);
      return { message: 'Token saved successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete()
  async remove(@Body() dto: CreateDeviceTokenDto) {
    try {
      const dataExist = await this.deviceTokenService.findOneByToken(dto);
      if (!dataExist) {
        throw new BadRequestException('Token not found');
      }
      await this.deviceTokenService.remove(dataExist.id);
      return { message: 'Token deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
