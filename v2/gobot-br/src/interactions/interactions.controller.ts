import { Controller, Post, Req } from '@nestjs/common';
import { InteractionResponseType, InteractionType } from 'discord-interactions';

@Controller('interactions')
export class InteractionsController {
    @Post()
    public discordInteraction(@Req() request: any){
        console.log("Interaction received");
        console.log(request.body);

        if(request.body.type === InteractionType.PING){
            return {
                type: InteractionResponseType.PONG
            }
        }
    }
}
