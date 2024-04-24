import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EventsService } from '../service/events.service';
import { JwtAuthGuard } from 'src/libs/jwt-auth.guard';
import { CreateEventDto } from '../dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.eventService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createEventDto: CreateEventDto): Promise<CreateEventDto> {
    return this.eventService.create(createEventDto);
  }
}
