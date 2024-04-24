import { EventsService } from './service/events.service';
import { EventsController } from './controller/events.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
