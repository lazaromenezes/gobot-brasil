import { InteractionResponseType } from 'discord-interactions';
import { Command } from '../command'
import { SlashCommandBuilder } from 'discord.js';

export class IdeasCommand implements Command {
    name: string = "geradordeideias";
    
    toJSON() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription("retorna uma ideia aleatória de game utilizando as tags da steam")
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