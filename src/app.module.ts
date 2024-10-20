import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmConfigService } from './libs/type-orm-config-service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsUnique } from './libs/is-unique';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UserAuthModule } from './user-auth/user-auth.module';
import { AttachmentModule } from './attachment/attachment.module';
import { DeviceTokenModule } from './device-token/device-token.module';
import { MailerModule } from './mailer/mailer.module';
import { OtpModule } from './otp/otp.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    if (process.env.NODE_ENV === 'production') {
      consumer
        .apply(LoggerMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
  }
}
