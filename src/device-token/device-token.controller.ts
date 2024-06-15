import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { DeviceTokenService } from './device-token.service';
import { CreateDeviceTokenDto } from './dto/create-device-token.dto';
import { JwtGuard } from 'src/user-auth/libs/jwt.guard';
import { GetUser } from 'src/libs/get-user.decorator';
import { UserAuth } from 'src/user-auth/entities/user-auth.entity';

@Controller('device-token')
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
      throw new BadRequestException(error);
    }
  }

  @Delete()
  async remove(@Body() dto: CreateDeviceTokenDto) {
    try {
      const dataExist = await this.deviceTokenService.findOneByToken(dto);
      if (!dataExist) {
        throw { message: 'Token not found' };
      }
      await this.deviceTokenService.remove(dataExist.id);
      return { message: 'Token deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
