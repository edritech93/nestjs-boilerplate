import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from '../model/user.model';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  create(user: UserModel): Promise<UserModel> {
    return this.userRepository.save(user);
  }

  findAll(): Promise<UserModel[]> {
    return this.userRepository.find();
  }
}
