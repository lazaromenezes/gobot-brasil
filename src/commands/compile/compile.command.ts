import { InteractionResponseType } from 'discord-interactions';
import { Command } from '../command'
import { ActionRowBuilder, EmbedBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export class CompileCommand implements Command {
    name: string = "compilar";

    toJSON(): any {
        return new SlashCommandBuilder()
        .setName(this.name)
        .setDescription("Roda o script inserido")
        .addSubcommand(subcommand => subcommand
            .setName('texto')
            .setDescription('compila um script em texto'))
        .toJSON();
    }

    async handle(body: any) {
        
        const optionsData = body.data.options;

        console.log(optionsData);

        if(optionsData.length == 0){
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    embeds: this.help()
                }
            };
        }

        var option = optionsData[0];

        switch(option.name){
            case "texto":
                const url = `https://discord.com/api/v10/interactions/${body.id}/${body.token}/callback`

                const modal = new ModalBuilder()
                    .setCustomId("compile-text-modal")
                    .setTitle("Gobot Compiler")
                
                    const input = new TextInputBuilder()
                    .setCustomId("script-text")
                    .setLabel("Script")
                    .setStyle(TextInputStyle.Paragraph)

                const row: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>().addComponents(input)

                modal.setComponents(row);

                return {
                    type: InteractionResponseType.MODAL,
                    data: modal
                };

            case "arquivo":
                break;
        }


        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                tts: false,
                embeds: this.help()
            }
        };
    }

    private help() {
        const useExample = "\\```swift\nprint(algo)\n\\```\n"
        const embed = new EmbedBuilder()
            .setTitle("forma correta de uso")
            .setColor("#2596be")
            .setFields([
                {
                    name: "Via texto",
                    value: `escreva no campo assim:\n${useExample}\n depois envie-o pelo comando **g:compilar script <texto>**`
                }
            ])

        return embed
    }
}