import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verifyKeyMiddleware } from 'discord-interactions';

@Injectable()
export class DiscordAuthenticationMiddleware implements NestMiddleware {

  constructor(private environment: ConfigService){}
  
  use = verifyKeyMiddleware(this.environment.get("DISCORD_PUBLIC_KEY"));
}
