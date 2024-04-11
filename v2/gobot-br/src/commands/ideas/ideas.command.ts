import { InteractionResponseType } from 'discord-interactions';
import { Command, DiscordCommandType } from '../command'

export class IdeasCommand implements Command {
    name: string = "geradordeideias";
    description: string = "Retorna uma ideia aleatória de game utilizando as tags da steam";
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