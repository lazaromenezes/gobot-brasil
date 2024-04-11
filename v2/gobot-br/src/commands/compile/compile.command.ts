import { InteractionResponseType } from 'discord-interactions';
import { Command, DiscordCommandType } from '../command'

export class CompileCommand implements Command {
    name: string = "compilar";
    description: string = "Roda o script inserido";
    type: DiscordCommandType = DiscordCommandType.CHAT_INPUT;

    handle(body: any) {
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                tts: false,
                content: "Aguarde..."
            }
        };
    }
}