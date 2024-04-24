import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { jwtConstants } from 'src/libs/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({ secret: jwtConstants.secret }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
