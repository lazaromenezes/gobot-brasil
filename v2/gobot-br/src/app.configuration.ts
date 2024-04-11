import { Injectable } from "@nestjs/common";

@Injectable()
export class Environment {
    public DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;
    public DISCORD_APP_ID = process.env.DISCORD_APP_ID;
    public DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
    public PORT = process.env.PORT;
}