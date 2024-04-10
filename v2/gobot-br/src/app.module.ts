import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordAuthenticationMiddleware } from './discord-authentication/discord-authentication.middleware';
import { InteractionsModule } from './interactions/interactions.module';
import { InteractionsController } from './interactions/interactions.controller';
import { Environment } from './app.configuration.service';

@Module({
  imports: [InteractionsModule],
  controllers: [AppController],
  providers: [AppService, Environment],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DiscordAuthenticationMiddleware)
    .forRoutes(InteractionsController)
  }
}
