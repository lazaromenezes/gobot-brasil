import { InteractionResponseType } from "discord-interactions";
import { ModalHandler } from "../command";
import { EmbedBuilder } from "discord.js";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import { exec } from "child_process";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TextCompileModalHandler implements ModalHandler{
    modalId: string = "compile-text-modal";
    
    constructor(private configuration: ConfigService){}

    async handle(body: any) {
        
        const actionRow = body.data.components[0];

        const textInput = actionRow.components.find(c => c.custom_id === "script-text");

        if(textInput){
            return await this.runScript(textInput.value);
        }

        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                tts: false,
                embeds: [this.help()]
            }
        };
    }

    private help() {
        const useExample = "```swift\nprint(algo)\n```"
        const embed = new EmbedBuilder()
            .setTitle("forma correta de uso")
            .setColor("#2596be")
            .setFields([
                {
                    name: "Via texto",
                    value: `escreva no campo assim:\n${useExample}\n depois envie-o pelo comando **g:compilar script <texto>**`
                }
            ])

        return embed;
    }

    private async runScript(script: string) {
        const TEMPLATE_SCRIPT: string = "extends SceneTree\n\nfunc _init():\n\t:INSERIR:\n\tquit()";
        
        let content = script
        
        if (!(script.includes("extends") || script.includes("func _init():"))) {
            content = TEMPLATE_SCRIPT.replace(":INSERIR:", content);
        }

        const godot = this.configuration.get("GODOT_PATH");
        const scriptPath = this.configuration.get("SCRIPTS_PATH");
        
        let fileName = `${scriptPath}/${randomUUID()}.gd`;
        
        await writeFile(fileName, content);

        return new Promise((resolve) => {
            exec(`${godot} -s ${fileName}`, (error, stdout, stderr) => {            
                if (error) {
                    console.log(`error: ${error.message}`);
                    resolve({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            tts: false,
                            content: "Falha ao processar"
                        }
                    });
                }else{
                    const embed = new EmbedBuilder()
                        .setColor("#2596be")
        
                    if (stderr) {
                        console.log(`error: ${stderr}`);
        
                        embed.setTitle("Erro no script")
                            .setDescription("```\n" + stderr + "```")
                            .setColor("#ff4444")
        
                        resolve({
                            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                            data: {
                                tts: false,
                                embeds: [embed]
                            }
                        })
                    }else {
                        embed.setTitle("Saída do script")
                        .setDescription("```\n" + stdout + "```")
        
                        resolve( {
                            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                            data: {
                                tts: false,
                                embeds: [embed]
                            }
                        });
                    }
                }
            })
        });
    }
}