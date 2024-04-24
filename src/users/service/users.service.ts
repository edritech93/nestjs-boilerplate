import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Users } from '../entity/users.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersRepository.save(createUserDto);
  }

  findAll(): Promise<CreateUserDto[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<CreateUserDto> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<CreateUserDto> {
    return this.usersRepository.findOneBy({ email: email });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update(+id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(+id);
  }
}
