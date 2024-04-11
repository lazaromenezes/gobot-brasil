import { Controller, Inject, Post, Req } from '@nestjs/common';
import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { COMMANDS, Command } from 'src/commands/command';

@Controller('interactions')
export class InteractionsController {
    
    constructor(@Inject(COMMANDS) private commands: Array<Command>){}

    @Post()
    public discordInteraction(@Req() request: any){
        console.log("Interaction received");
        console.log(request.body);

        if(request.body.type === InteractionType.PING)
            return {
                type: InteractionResponseType.PONG
            };

        if(request.body.type === InteractionType.APPLICATION_COMMAND){
            var command: Command = this.commands.filter(c => c.name === request.body.data.name)[0];

            var response = command.handle(request.body);

            console.log("Interaction received");
            console.log(response);

            return response;
        }
    }
}
