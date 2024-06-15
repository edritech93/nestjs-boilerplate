import { Test, TestingModule } from '@nestjs/testing';
import { DeviceTokenController } from './device-token.controller';
import { DeviceTokenService } from './device-token.service';

describe('DeviceTokenController', () => {
  let controller: DeviceTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceTokenController],
      providers: [DeviceTokenService],
    }).compile();

    controller = module.get<DeviceTokenController>(DeviceTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
