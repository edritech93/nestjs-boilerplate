import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Boilerplate APIs')
    .setDescription('Enjoy Boilerplate APIs Documentation.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(8080);
  return console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
