export const COMMANDS: string = "COMMANDS"

export enum DiscordCommandType {
    CHAT_INPUT = 1,
    USER = 2,
    MESSAGE = 3
}

export interface Command{
    name: string,
    description: string,
    type: DiscordCommandType

    handle(body: any): any
}