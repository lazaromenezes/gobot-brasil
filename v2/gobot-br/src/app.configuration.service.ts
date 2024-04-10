import { Injectable } from "@nestjs/common";

@Injectable()
export class Environment {
    public DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY || "564fc929c7fb263493a8edc3adbb110dd278a938b5fecb4edc582141bd5a93ab";
    public PORT = process.env.PORT || "3000";
}