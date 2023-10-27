import {WebSocket} from "ws";
import crypto from "crypto";

interface Game {
    code: string;
    players: WebSocket[];
    key: string;
}

export function findGameWithCode(code: string): Game | undefined {
    return games.find((game) => game.code === code);
}

export const games: Game[] = [
    {
        code: "1234",
        players: [],
        key: crypto.randomUUID()
    }
];
