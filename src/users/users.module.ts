import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/libs/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({ secret: jwtConstants.secret }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
