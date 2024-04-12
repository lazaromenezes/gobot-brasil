import { Injectable } from "@nestjs/common";
import { Command } from "../command";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { InteractionResponseType } from "discord-interactions";

@Injectable()
export class DocsCommand implements Command{
    name: string = "docs";

    async handle(body: any) {
        try {
            const search = body.data.options.find(o => o.name === 'pesquisa')

            if (!search)
                return {
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        tts: false,
                        content: "Esta é a documentação oficial da godot \n \nhttps://docs.godotengine.org/pt_BR/stable/index.html"
                    }
                };

            const url = `https://docs.godotengine.org/_/api/v2/search/?q=${search.value}&project=godot-pt-br&version=4.x&language=pt-br`

            const response = await fetch(url);
            const content = await response.json();

            const data = content.results[0];

            if (data === undefined)
                return {
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        tts: false,
                        content: "Nada encontrado. veja se a sua ortografia está correta."
                    }
                };


            let fields: Array<any> = [];

            for (const block of data.blocks) {
                if (block.content.length == 0) continue

                const fields = [];

                const contentArray = block.content.split(" ");
                var value = contentArray.slice(0, 50).join(" ");
                value = value + (contentArray.length >= 50 ? "..." : "");

                fields.push({name: block.title, value: value});
            }
            
            const embedMsg = new EmbedBuilder()
                .setTitle(data.title)
                .setColor("#2596be")
                .setThumbnail("https://docs.godotengine.org/en/stable/_static/docs_logo.png")
                .setURL(data.domain + data.path)
                .setFields(fields)
                .setFooter({ text: `version: ${data.version} \n\Coletado direto da doc: https://docs.godotengine.org/`})

            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    tts: false,
                    embeds: [embedMsg]
                }
            };
        } catch (err) {
            console.error(err)

            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    tts: false,
                    content: "Ocorreu um erro inesperado ao consultar a documentação."
                }
            };
        }
    }

    toJSON() {
        return new SlashCommandBuilder()
        .setName(this.name)
        .setDescription('pesquisa na documentação atual pt-br da godot')
        .addStringOption(option => option.setName('pesquisa').setDescription('pesquise algo mais específico'))
        .toJSON();
    }
}