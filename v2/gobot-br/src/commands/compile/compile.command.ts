import { InteractionResponseType } from 'discord-interactions';
import { Command } from '../command'
import { SlashCommandBuilder } from 'discord.js';

export class CompileCommand implements Command {
    name: string = "compilar";

    toJSON(): any {
        return new SlashCommandBuilder()
        .setName(this.name)
        .setDescription("Roda o script inserido")
        .toJSON();
    }

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