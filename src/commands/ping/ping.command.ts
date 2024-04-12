import { InteractionResponseType } from "discord-interactions";
import { Command } from "../command";
import { SlashCommandBuilder } from "discord.js";

export class PingCommand implements Command{
    name: string = "ping";

    toJSON(): any {
        return new SlashCommandBuilder()
        .setName(this.name)
        .setDescription("mostra o delay com o servidor do bot")
        .toJSON();
    }

    handle(body: any) {
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                tts: false,
                content: "PONG!"
            }
        };
    }
}