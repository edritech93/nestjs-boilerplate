import { Injectable } from '@nestjs/common';
import { CreateDeviceTokenDto } from './dto/create-device-token.dto';
import { Repository } from 'typeorm';
import { DeviceToken } from './entities/device-token.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeviceTokenService {
  constructor(
    @InjectRepository(DeviceToken)
    private deviceTokenRepository: Repository<DeviceToken>,
  ) {}

  create(dto: CreateDeviceTokenDto) {
    return this.deviceTokenRepository.save(dto);
  }

  findOneByToken(dto: CreateDeviceTokenDto) {
    return this.deviceTokenRepository.findOne({
      where: [{ token: dto.token, deviceType: dto.deviceType }],
    });
  }

  remove(id: number) {
    return this.deviceTokenRepository.delete(id);
  }
}
