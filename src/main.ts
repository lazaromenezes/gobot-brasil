import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestApplicationOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  
  var initializationOptions: NestApplicationOptions = {
    rawBody: true, 
    bodyParser: false,
    logger: ['debug', 'error', 'log', 'verbose']
  }
  
  const app = await NestFactory.create(AppModule, initializationOptions);
  const config = app.get(ConfigService);
  await app.listen(config.get("PORT"));
}

bootstrap();
