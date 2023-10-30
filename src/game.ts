import {WebSocket} from "ws";
import crypto from "crypto";

export interface Game {
    code: string;
    players: Player[];
    host: Player;
    key: string;
}

export interface Player {
    ws: WebSocket;
    name: string;
}

export function findGameWithCode(code: string): Game | undefined {
    return games.find((game) => game.code === code);
}

export function findPlayerInGame(game: Game, name: string): Player | undefined {
    return game.players.find((player) => player.name === name);
}

export function generateGameKey(): string {
    return crypto.randomBytes(32).toString("hex");
}

export function generateGameCode(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";

    do {
        code = "";
        for (let i = 0; i < 4; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    } while (findGameWithCode(code) !== undefined);

    return code;
}

export const games: Game[] = [];
