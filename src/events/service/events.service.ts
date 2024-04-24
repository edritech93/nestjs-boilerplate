import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from '../entities/events.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private eventsRepository: Repository<Events>,
  ) {}

  findAll(): Promise<CreateEventDto[]> {
    return this.eventsRepository.find();
  }

  create(createEventDto: CreateEventDto): Promise<CreateEventDto> {
    return this.eventsRepository.save(createEventDto);
  }
}
