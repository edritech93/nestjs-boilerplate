import { EventsService } from './service/events.service';
import { EventsController } from './controller/events.controller';
import { Module } from '@nestjs/common';
import { Events } from './entities/events.entity';
import { jwtConstants } from 'src/libs/constants';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Events]),
    JwtModule.register({ secret: jwtConstants.secret }),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
