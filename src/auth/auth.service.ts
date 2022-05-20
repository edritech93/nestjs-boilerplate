import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AuthModel } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
  ) {}

  registerAuth(authModel: AuthModel): Promise<AuthModel> {
    return this.authRepository.save(authModel);
  }

  loginAuth(authModel: AuthModel): Promise<AuthModel> {
    return this.authRepository.save(authModel);
  }
}
