import { InteractionResponseType } from 'discord-interactions';
import { Command, DiscordCommandType } from '../command'

export class FirstSteps implements Command {
    name: string = "primeirospassos";
    description: string = "Mostra por onde todo iniciante deve começar";
    type: DiscordCommandType = DiscordCommandType.CHAT_INPUT;
    
    handle(body: any) {
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                tts: false,
                content: "É perigoso ir sozinho, pegue isso aqui \n \nhttps://docs.godotengine.org/pt_BR/stable/getting_started/step_by_step/index.html"
            }
        };
    }
}

export default FirstSteps
