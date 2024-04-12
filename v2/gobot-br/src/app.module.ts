import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordAuthenticationMiddleware } from './discord-authentication/discord-authentication.middleware';
import { InteractionsModule } from './interactions/interactions.module';
import { InteractionsController } from './interactions/interactions.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    InteractionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".local.env", ".env"]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DiscordAuthenticationMiddleware)
    .forRoutes(InteractionsController)
  }
}
