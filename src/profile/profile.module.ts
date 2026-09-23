import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Profile } from './entities/profile.entity';
import { UserAuthService } from '../user-auth/user-auth.service';
import { UserAuth } from '../user-auth/entities/user-auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, UserAuth])],
  controllers: [ProfileController],
  providers: [ProfileService, UserAuthService],
})
export class ProfileModule {}
