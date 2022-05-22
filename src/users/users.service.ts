import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { UsersModel } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  createUsers(usersModel: UsersModel): Promise<UsersModel> {
    return this.usersRepository.save(usersModel);
  }

  findAllUser(): Promise<UsersModel[]> {
    return this.usersRepository.find();
  }

  findOneUser(userId: number) {
    return this.usersRepository.findOne({ id: userId });
  }

  findOneUpdate(userId: number, body: any) {
    this.usersRepository.update({ id: userId }, body);
  }
}
