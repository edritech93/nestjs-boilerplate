import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerService } from '../mailer/mailer.service';
import { Otp } from '../otp/entities/otp.entity';
import { OtpService } from '../otp/otp.service';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { UserAuth } from './entities/user-auth.entity';
import { Profile } from '../profile/entities/profile.entity';
import { ProfileService } from '../profile/profile.service';

const jwtModule = JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_KEY'),
  }),
  inject: [ConfigService],
  global: true,
});

@Module({
  imports: [TypeOrmModule.forFeature([UserAuth, Profile, Otp]), jwtModule],
  controllers: [UserAuthController],
  providers: [UserAuthService, ProfileService, MailerService, OtpService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
