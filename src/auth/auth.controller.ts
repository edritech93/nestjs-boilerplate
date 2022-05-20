import { Body, Controller, Post } from '@nestjs/common';
import { getPasswordHash } from 'src/helper/hashing';
import { MessageModel } from 'src/helper/message.model';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async create(@Body() authModel: AuthModel): Promise<MessageModel> {
    const passwordHash = await getPasswordHash(authModel.password);
    const body: AuthModel = {
      ...authModel,
      password: passwordHash,
    };
    this.authService.registerAuth(body);
    return { message: 'Berhasil Mendaftar' };
  }
}
