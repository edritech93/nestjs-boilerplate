import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getPasswordHash, isMatchPassword } from 'src/helper/hashing';
import { MessageModel } from 'src/helper/message.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<MessageModel> {
    const passwordHash = await getPasswordHash(createUserDto.password);
    const body: CreateUserDto = {
      ...createUserDto,
      password: passwordHash,
    };
    this.usersService.create(body);
    return { message: 'Berhasil Mendaftar' };
  }

  @Post('login')
  async login(@Body() body: any): Promise<MessageModel> {
    const authModel: CreateUserDto = await this.usersService.findOneByEmail(
      body.email,
    );
    if (authModel) {
      const isMatch = await isMatchPassword(body.password, authModel.password);
      if (isMatch) {
        return { message: 'Berhasil Login' };
      } else {
        return { message: 'Password Salah' };
      }
    } else {
      return { message: 'User Tidak Ditemukan' };
    }
  }
}
