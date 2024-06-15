import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MailerService],
})
export class MailerModule {}
