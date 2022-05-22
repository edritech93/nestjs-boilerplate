import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './helper/jwt.strategy';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot(), UsersModule],
  providers: [JwtStrategy],
})
export class AppModule {}
