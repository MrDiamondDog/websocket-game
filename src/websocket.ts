import {WebSocket, WebSocketServer} from "ws";
import {findGameWithCode} from "./game";

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

    console.log("Someone joined room " + code);
    game.players.push(ws);
    ws.send("ok");

    ws.on("message", (message) => {
        console.log(`Received message: ${message}`);
        ws.send(message);
    });

    ws.on("close", () => {
        game.players.splice(game.players.indexOf(ws), 1);
        console.log("Someone left room " + code);
    });
});
