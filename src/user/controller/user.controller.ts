import { Controller, Get, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: UserModel): Promise<UserModel> {
    return this.userService.create(user);
  }

  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.userService.findAll();
  }
}
