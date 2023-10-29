import express from "express";
import {Game, findGameWithCode, games, generateGameCode, generateGameKey} from "./game";

export const app = express();
export const port = process.env.PORT || 8000;

app.use("/dist", express.static(process.cwd() + "/frontend/dist/"));
app.use("/assets", express.static(process.cwd() + "/frontend/assets/"));

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/frontend/index.html");
});

app.get("/game/:slug", (req, res) => {
    const code = req.params.slug;

    const game = findGameWithCode(code);

    if (game === undefined) {
        res.status(404).send("Game not found");
        return;
    }

    res.send(game.key);
});

app.post("/game", (req, res) => {
    const selectedGame = req.body as string;

    const game: Game = {
        code: generateGameCode(),
        players: [],
        key: generateGameKey()
    };

    games.push(game);

    res.send(game.code);
});

app.delete("/game/:slug", (req, res) => {
    const code = req.params.slug;

    const game = findGameWithCode(code);

    if (game === undefined) {
        res.status(404).send("Game not found");
        return;
    }

    games.splice(games.indexOf(game), 1);

    game.players.forEach((player) => {
        player.ws.close();
    });

    res.send("ok");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
