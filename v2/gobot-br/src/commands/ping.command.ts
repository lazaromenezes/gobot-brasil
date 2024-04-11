import { InteractionResponseType } from "discord-interactions";
import { Command, DiscordCommandType } from "./command";

export class PingCommand implements Command{
    name: string = "ping";
    description: string = "Testa a latência do servidor";
    type: DiscordCommandType = DiscordCommandType.CHAT_INPUT;


    handle(body: any) {
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                tts: false,
                content: "PONG"
            }
        };
    }
}