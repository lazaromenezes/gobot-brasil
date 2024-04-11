import { Injectable, NestMiddleware } from '@nestjs/common';
import { verifyKeyMiddleware } from 'discord-interactions';
import { Environment } from 'src/app.configuration';

@Injectable()
export class DiscordAuthenticationMiddleware implements NestMiddleware {

  constructor(private environment: Environment){}
  
  use = verifyKeyMiddleware(this.environment.DISCORD_PUBLIC_KEY);
}
