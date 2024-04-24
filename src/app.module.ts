import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './libs/jwt.strategy';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [process.env.ENTITY_PATH],
      synchronize: process.env.NODE_ENV !== 'production' ? true : false,
    }),
    UsersModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
