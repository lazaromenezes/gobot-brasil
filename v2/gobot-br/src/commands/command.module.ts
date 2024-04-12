import { Inject, Logger, Module, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { PingCommand } from "./ping/ping.command";
import { COMMANDS, Command, MODAL_HANDLERS } from "./command";
import { HelpCommand } from "./help/help.command";
import { FirstStepsCommand } from "./links/firstSteps.command";
import { CompileCommand } from "./compile/compile.command";
import { IdeasCommand } from "./ideas/ideas.command";
import { DocsCommand } from "./docs/docs.command";
import { TextCompileModalHandler } from "./compile/compile.text.command";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    providers: [
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
        },
        TextCompileModalHandler,
        {
            provide: MODAL_HANDLERS,
            useFactory: (textCompile) => [textCompile],
            inject: [TextCompileModalHandler]
        },
    ],
    exports: [
        {provide: COMMANDS, useExisting: COMMANDS},
        {provide: MODAL_HANDLERS, useExisting: MODAL_HANDLERS}
    ]
})
export class CommandsModule implements OnApplicationBootstrap{
    private logger: Logger;
    private endpoint: string;

    constructor(
        @Inject(COMMANDS) private commands: Array<Command>,
        private config: ConfigService
    ){
        this.logger = new Logger(CommandsModule.name)
        this.endpoint = `https://discord.com/api/v10/applications/${this.config.get("DISCORD_APP_ID")}/commands`;
    }

    async onApplicationBootstrap(): Promise<void> {
        if(!await this.clearCommands())
            this.logger.error("Failed to clear commands");
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
                Authorization: `Bot ${this.config.get("DISCORD_BOT_TOKEN")}`,
                'Content-Type': 'application/json; charset=UTF-8'
            },
            method: 'PUT',
            body: body 
        });
    }
}