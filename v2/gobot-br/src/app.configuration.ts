import { Injectable } from "@nestjs/common";
import { LOCAL_CONFIG } from "./app.configuration.local";

@Injectable()
export class Environment {
    public DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;
    public DISCORD_APP_ID = process.env.DISCORD_APP_ID;
    public DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
    public PORT = process.env.PORT;

    constructor(){
        if(LOCAL_CONFIG)
            this.patch(LOCAL_CONFIG);
    }

    private patch(config: any){
        this.DISCORD_APP_ID = config.DISCORD_APP_ID;
        this.DISCORD_BOT_TOKEN = config.DISCORD_BOT_TOKEN;
        this.DISCORD_PUBLIC_KEY = config.DISCORD_PUBLIC_KEY;
        this.PORT = config.PORT;
    }
}