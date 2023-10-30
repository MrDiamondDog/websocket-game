import {Elements} from "./index.js";
import {Websocket} from "./ws.js";

export function initJoin() {
    Elements.join.joinButton.on("click", () => {
        const code = Elements.join.codeInput.value();
        const name = Elements.join.nameInput.value();

        if (!code || !name) {
            Elements.join.error.text("Please fill in all fields");
            return;
        }

        if (code.length !== 4) {
            Elements.join.error.text("Code must be 4 characters long");
            return;
        }

        fetch("/game/" + code)
            .then((res) => {
                if (!res.ok) {
                    Elements.join.error.text("Game not found");
                    return;
                }

                return res.text();
            })
            .then((key) => {
                if (key === undefined) return;

                Elements.join.container.hide();
                Elements.join.error.hide();

                const ws = Websocket.connect(key, code, name);

                ws.addEventListener("message", (message) => {
                    if (message.data == "ok") {
                        console.log("Connected to WS server");
                        Elements.game.container.show();
                        Elements.switcher.hide();
                        Elements.game.code.text(`Code: ${code}`);
                        Elements.game.leave.on("click", () => ws.close());
                        return;
                    }

                    console.log(`Received message: ${message.data}`);
                });

                ws.addEventListener("close", () => {
                    console.log("Disconnected from WS server");

                    Elements.game.container.hide();
                    Elements.join.container.show();
                    Elements.game.startGame.hide();
                });
            });
    });
}
