export const COMMANDS: string = "COMMANDS"
export const MODAL_HANDLERS: string = "MODALS"

export interface Command{
    name: string;
    handle(body: any): any;
    toJSON(): any;
}

export interface ModalHandler {
    modalId: string;
    handle(body: any): any;
}