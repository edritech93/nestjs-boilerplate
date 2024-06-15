import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileRepository.save(createProfileDto);
  }

  findOne(id: number): Promise<Profile> {
    return this.profileRepository.findOneBy({ id });
  }

  update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<UpdateResult> {
    return this.profileRepository.update(+id, updateProfileDto);
  }
}
