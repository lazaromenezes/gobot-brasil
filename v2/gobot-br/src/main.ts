import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Environment } from './app.configuration.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(new Environment().PORT);
}

bootstrap();
