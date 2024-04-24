import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EventsService } from '../service/events.service';
import { JwtAuthGuard } from 'src/libs/jwt-auth.guard';
import { CreateEventDto } from '../dto/create-event.dto';
import { GetUser } from 'src/libs/get-user.decorator';
import { Users } from 'src/users/entity/users.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.eventService.findAll();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  find(@Param('id') eventId: number) {
    return this.eventService.find(eventId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createEventDto: CreateEventDto, @GetUser() user: Users) {
    const body: CreateEventDto = { ...createEventDto, userId: user.id };
    return this.eventService.create(body);
  }
}
