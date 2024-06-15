import { Injectable } from '@nestjs/common';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>,
  ) {}

  create(createAttachmentDto: CreateAttachmentDto) {
    return this.attachmentRepository.save(createAttachmentDto);
  }

  findOne(id: number) {
    return this.attachmentRepository.findOne({ where: [{ id }] });
  }
}
