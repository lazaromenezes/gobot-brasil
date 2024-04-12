import { Controller, Inject, Post, Req } from '@nestjs/common';
import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { COMMANDS, Command, MODAL_HANDLERS, ModalHandler } from 'src/commands/command';

@Controller('interactions')
export class InteractionsController {
    
    constructor(
        @Inject(COMMANDS) private commands: Array<Command>,
        @Inject(MODAL_HANDLERS) private handlers: Array<ModalHandler>
    ){}

    @Post()
    public async discordInteraction(@Req() request: any){
        console.log("Interaction received");
        console.log(request.body);

        if(request.body.type === InteractionType.PING)
            return {
                type: InteractionResponseType.PONG
            };

        if(request.body.type === InteractionType.APPLICATION_COMMAND){
            var command: Command = this.commands.filter(c => c.name === request.body.data.name)[0];

            var response = await command.handle(request.body);

            console.log(response);

            return response;
        }

        if(request.body.type === InteractionType.MODAL_SUBMIT){
            var handler: ModalHandler = this.handlers.filter(c => c.modalId === request.body.data.custom_id)[0];

            var response = await handler.handle(request.body);

            console.log(response);

            return response;
        }
    }
}
