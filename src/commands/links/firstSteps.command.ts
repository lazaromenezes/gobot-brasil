import { InteractionResponseType } from 'discord-interactions';
import { Command } from '../command'
import { SlashCommandBuilder } from 'discord.js';

export class FirstStepsCommand implements Command {
    name: string = "primeirospassos";

    toJSON(): any {
        return new SlashCommandBuilder()
        .setName(this.name)
        .setDescription("mostra por onde todo iniciante deve começar");
    }
    
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
