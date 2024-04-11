import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Environment } from './app.configuration';
import { NestApplicationOptions } from '@nestjs/common';

async function bootstrap() {
  
  var initializationOptions: NestApplicationOptions = {
    rawBody: true, 
    bodyParser: false,
    logger: ['debug', 'error', 'log', 'verbose']
  }
  
  const app = await NestFactory.create(AppModule, initializationOptions);
  
  app.enableShutdownHooks();

  await app.listen(new Environment().PORT);
}

bootstrap();
