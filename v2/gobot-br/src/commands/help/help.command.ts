import { InteractionResponseType } from 'discord-interactions';
import { Command } from '../command'
import { SlashCommandBuilder } from 'discord.js';

export class HelpCommand implements Command {
    name: string = "help";

    toJSON(): any {
        return new SlashCommandBuilder()
        .setName(this.name)
        .setDescription("Mostra como funciona os comandos")
        .addStringOption(option => option.setName('comando').setDescription("fale um comando específico"))
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