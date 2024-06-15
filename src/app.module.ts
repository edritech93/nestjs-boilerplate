import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsUnique } from './libs/is-unique';
import { UserAuthModule } from './user-auth/user-auth.module';
import { AttachmentModule } from './attachment/attachment.module';
import { DeviceTokenModule } from './device-token/device-token.module';
import { MailerModule } from './mailer/mailer.module';
import { OtpModule } from './otp/otp.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [process.env.ENTITY_PATH],
      synchronize: process.env.NODE_ENV !== 'production' ? true : false,
    }),
    UserAuthModule,
    AttachmentModule,
    DeviceTokenModule,
    MailerModule,
    OtpModule,
    ProfileModule,
  ],
  providers: [IsUnique],
})
export class AppModule {}
