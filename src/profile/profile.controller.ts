import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/libs/get-user.decorator';
import { MessageModel } from 'src/libs/message.model';
import { JwtGuard } from 'src/user-auth/libs/jwt.guard';
import { UserAuth } from 'src/user-auth/entities/user-auth.entity';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserAuthService } from 'src/user-auth/user-auth.service';

@Controller('profile')
@UseGuards(JwtGuard)
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly userAuthService: UserAuthService,
  ) {}

  @Get('me')
  getMyProfile(@GetUser() user: UserAuth): Promise<UserAuth> {
    try {
      return this.userAuthService.findOneById(user.id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  searchUser(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<UserAuth[]> {
    try {
      return this.userAuthService.findAll({ search, page, limit });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('get-by-id/:id')
  async getUserById(@Param('id') id: string): Promise<UserAuth> {
    try {
      const dataExist = await this.userAuthService.findOneById(+id);
      if (!dataExist) {
        throw { message: 'User not found' };
      }
      return dataExist;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put()
  async editProfile(
    @GetUser() user: UserAuth,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<MessageModel> {
    try {
      await this.profileService.update(user.id, updateProfileDto);
      return { message: 'Update Successfully' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
