import { Inject, Logger, Module, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { PingCommand } from "./ping/ping.command";
import { COMMANDS, Command } from "./command";
import { Environment } from "src/app.configuration";
import { HelpCommand } from "./help/help.command";
import { FirstStepsCommand } from "./links/firstSteps.command";
import { CompileCommand } from "./compile/compile.command";
import { IdeasCommand } from "./ideas/ideas.command";
import { DocsCommand } from "./docs/docs.command";

@Module({
    providers: [
        Environment,
        PingCommand,
        HelpCommand,
        FirstStepsCommand,
        CompileCommand,
        IdeasCommand,
        DocsCommand,
        {
            provide: COMMANDS,
            useFactory: (ping, help, steps, compile, ideas, docs) => [ping, help, steps, compile, ideas, docs],
            inject: [PingCommand, HelpCommand, FirstStepsCommand, CompileCommand, IdeasCommand, DocsCommand]
        }
    ],
    exports: [
        {
            provide: COMMANDS,
            useFactory: (ping, help, steps, compile, ideas, docs) => [ping, help, steps, compile, ideas, docs],
            inject: [PingCommand, HelpCommand, FirstStepsCommand, CompileCommand, IdeasCommand, DocsCommand]
        }
    ]
})
export class CommandsModule implements OnApplicationBootstrap{
    private logger: Logger;
    private endpoint: string;

    constructor(
        @Inject(COMMANDS) private commands: Array<Command>,
        private environment: Environment
    ){
        this.logger = new Logger(CommandsModule.name)
        this.endpoint = `https://discord.com/api/v10/applications/${this.environment.DISCORD_APP_ID}/commands`;
    }

    async onApplicationBootstrap(): Promise<void> {
        // if(!await this.clearCommands())
        //     this.logger.error("Failed to clear commands");
        await this.registerCommands();
    }

    private async clearCommands(){
        this.logger.log("Clearing commands");

        const res = await this.sendDiscordRequest("[]");

        return res.ok
    }

    private async registerCommands(){
        this.logger.log("Registering commands");
        const content = JSON.stringify(this.commands.map(c => c.toJSON()));

        const res = await this.sendDiscordRequest(content);

        if (!res.ok) {
            const data = await res.json();
            this.logger.debug(res.status);
            throw new Error(JSON.stringify(data));
        }
    }

    private sendDiscordRequest(body: string){
        return fetch(this.endpoint, {
            headers: {
                Authorization: `Bot ${this.environment.DISCORD_BOT_TOKEN}`,
                'Content-Type': 'application/json; charset=UTF-8'
            },
            method: 'PUT',
            body: body 
        });
    }
}