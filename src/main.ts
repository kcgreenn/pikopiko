import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const port = parseInt(process.env.PORT) || 4000;
  Logger.log(`Server is running on port: ${port}`);
  await app.listen(port);
}
bootstrap();
