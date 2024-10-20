import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  create(dto: CreateProfileDto): Promise<Profile> {
    return this.profileRepository.save(dto);
  }

  findOne(id: number): Promise<Profile> {
    return this.profileRepository.findOneBy({ id });
  }

  findOneByUserId(userId: number): Promise<Profile> {
    return this.profileRepository.findOneBy({ userId });
  }

  update(id: number, dto: UpdateProfileDto): Promise<UpdateResult> {
    return this.profileRepository.update(+id, dto);
  }
}
