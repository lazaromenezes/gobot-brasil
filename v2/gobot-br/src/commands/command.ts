export const COMMANDS: string = "COMMANDS"

export interface Command{
    name: string;
    handle(body: any): any;
    toJSON(): any;
}