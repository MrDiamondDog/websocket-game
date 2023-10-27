import express from "express";
import {findGameWithCode} from "./game";

export const app = express();
export const port = process.env.PORT || 8000;

app.use("/dist", express.static(process.cwd() + "/frontend/dist/"));

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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
