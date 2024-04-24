import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { getPasswordHash, isMatchPassword } from 'src/libs/hashing';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from 'src/libs/jwt-auth.guard';
import { MessageModel } from 'src/libs/message.model';
import { LoginUserDto } from '../dto/login-user.dto';
import { jwtConstants } from 'src/libs/constants';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtTokenService: JwtService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
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
  async login(@Body() body: LoginUserDto): Promise<any> {
    const user: CreateUserDto = await this.usersService.findOneByEmail(
      body.email,
    );
    if (user) {
      const isMatch = await isMatchPassword(body.password, user.password);
      if (isMatch) {
        const payload = { sub: user.id, username: user.email };
        return {
          accessToken: this.jwtTokenService.sign(payload, {
            expiresIn: jwtConstants.expiredToken,
          }),
          refreshToken: this.jwtTokenService.sign(payload, {
            expiresIn: jwtConstants.expiredRefreshToken,
          }),
        };
      } else {
        throw new BadRequestException({ message: 'Password Salah' });
      }
    } else {
      throw new BadRequestException({ message: 'User Tidak Ditemukan' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Request() req: any): Promise<any> {
    const payload = { sub: req.user.id, username: req.user.email };
    return {
      accessToken: this.jwtTokenService.sign(payload, {
        expiresIn: jwtConstants.expiredToken,
      }),
      refreshToken: this.jwtTokenService.sign(payload, {
        expiresIn: jwtConstants.expiredRefreshToken,
      }),
    };
  }
}
