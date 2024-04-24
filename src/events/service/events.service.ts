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

  findAll(): Promise<Events[]> {
    return this.eventsRepository.find({
      relations: {
        user: true,
      },
    });
  }

  find(eventId: number): Promise<Events> {
    return this.eventsRepository.findOne({
      where: { id: eventId },
      relations: { user: true },
    });
  }

  create(createEventDto: CreateEventDto): Promise<Events> {
    return this.eventsRepository.save(createEventDto);
  }
}
