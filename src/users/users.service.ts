import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersRepository.save(createUserDto);
  }

  findAll(): Promise<CreateUserDto[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<CreateUserDto> {
    return this.usersRepository.findOne(+id);
  }

  findOneByEmail(email: string): Promise<CreateUserDto> {
    return this.usersRepository.findOne({email: email});
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update(+id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(+id);
  }
}
