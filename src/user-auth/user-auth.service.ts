import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from './entities/user-auth.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { JwtModel } from './dto/jwt.model';
import { AuthResponseModel } from './dto/auth-response.model';
import { UpdateUserAuthDto } from './dto/update-user-auth.dto';
import { PaginationModel } from '../libs/pagination.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(UserAuth)
    private authRepository: Repository<UserAuth>,
    private readonly configService: ConfigService,
  ) {}

  create(dto: CreateUserAuthDto): Promise<UserAuth> {
    return this.authRepository.save(dto);
  }

  findOneByEmail(email: string): Promise<UserAuth | null> {
    return this.authRepository.findOneBy({ email: email });
  }

  findOneById(userId: number): Promise<UserAuth | null> {
    return this.authRepository
      .createQueryBuilder('userAuth')
      .where(`userAuth.id = :id`, { id: userId })
      .leftJoin('userAuth.profile', 'profile')
      .select([
        'userAuth.id',
        'userAuth.email',
        'profile.fullName',
        'profile.dateOfBirth',
        'profile.attachmentId',
      ])
      .getOne();
  }

  findAll({ search, page, limit }: PaginationModel): Promise<UserAuth[]> {
    const query = this.authRepository
      .createQueryBuilder('userAuth')
      .leftJoin('userAuth.profile', 'profile')
      .select([
        'userAuth.id',
        'userAuth.email',
        'profile.fullName',
        'profile.dateOfBirth',
        'profile.attachmentId',
      ]);
    if (search) {
      query.andWhere('profile.fullName like :name', { name: `%${search}%` });
    }
    if (page && limit) {
      query.take(limit * 1).skip(page * limit);
    }
    return query.getMany();
  }

  getJwtSign(service: JwtService, payload: JwtModel): AuthResponseModel {
    return {
      accessToken: service.sign(payload, {
        expiresIn: this.configService.get<number>('JWT_TOKEN_AGE'),
      }),
      refreshToken: service.sign(payload, {
        expiresIn: this.configService.get<number>('JWT_REFRESH_TOKEN_AGE'),
      }),
      expiresIn: this.configService.get<number>('JWT_TOKEN_AGE') ?? 0,
    };
  }

  update(id: number, dto: UpdateUserAuthDto): Promise<UpdateResult> {
    return this.authRepository.update(+id, dto);
  }
}
