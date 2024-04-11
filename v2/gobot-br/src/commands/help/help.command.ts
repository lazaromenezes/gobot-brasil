import { InteractionResponseType } from 'discord-interactions';
import { Command, DiscordCommandType } from '../command'

export class HelpCommand implements Command {
    name: string = "help";
    description: string = "Mostra como funciona os comandos";
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