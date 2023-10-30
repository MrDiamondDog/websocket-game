import {WebSocket, WebSocketServer} from "ws";
import {findGameWithCode, findPlayerInGame} from "./game";

export const wssPort = 8080;
export const wss = new WebSocketServer({
    port: wssPort
});

wss.on("listening", () => {
    console.log(`WSS listening on ${wssPort}`);
});

wss.on("connection", (ws: WebSocket, req) => {
    const url = new URL(req.url, "http://localhost");
    const key = url.searchParams.get("key");
    const code = url.searchParams.get("code");
    const name = url.searchParams.get("name");

    const game = findGameWithCode(code);
    if (!game) {
        ws.send("Game not found");
        ws.close();
        return;
    }

    if (key !== game.key) {
        ws.send("Invalid key");
        ws.close();
        return;
    }

    if (findPlayerInGame(game, name!)) {
        ws.send("Name already taken");
        ws.close();
        return;
    }

    console.log(name + " joined room " + code);

    if (game.players.length === 0) game.host = {ws, name};
    game.players.push({ws, name});

    ws.send("ok");

    game.host.ws.send("player:" + name);

    ws.on("message", (message) => {
        console.log(`Received message: ${message}`);
        ws.send(message);
    });

    ws.on("close", () => {
        game.players.splice(game.players.indexOf(findPlayerInGame(game, name)!), 1);
        console.log(name + " left room " + code);
    });
});
