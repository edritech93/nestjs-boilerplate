import { Body, Controller, Post } from '@nestjs/common';
import { getPasswordHash, isMatchPassword } from 'src/helper/hashing';
import { MessageModel } from 'src/helper/message.model';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() authModel: AuthModel): Promise<MessageModel> {
    const passwordHash = await getPasswordHash(authModel.password);
    const body: AuthModel = {
      ...authModel,
      password: passwordHash,
    };
    this.authService.registerAuth(body);
    return { message: 'Berhasil Mendaftar' };
  }

  @Post('login')
  async login(@Body() body: any): Promise<MessageModel> {
    const authModel: AuthModel = await this.authService.loginAuth(body);
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
