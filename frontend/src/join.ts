import {Elements} from "./index.js";

export function initJoin() {
    Elements.join.joinButton.addEventListener("click", () => {
        const code = Elements.join.codeInput.value;
        const name = Elements.join.nameInput.value;

        if (!code || !name) {
            Elements.join.error.innerText = "Please fill in all fields";
            return;
        }

        if (code.length !== 4) {
            Elements.join.error.innerText = "Code must be 4 characters long";
            return;
        }

        fetch("/game/" + code)
            .then((res) => {
                if (!res.ok) {
                    Elements.join.error.innerText = "Game not found";
                    return;
                }

                return res.text();
            })
            .then((key) => {
                if (key === undefined) return;

                Elements.join.container.style.display = "none";
                Elements.join.error.style.display = "none";

                const ws = new WebSocket(
                    `ws://${window.location.hostname}:8080?key=${key}&code=${code}&name=${name}`
                );

                ws.addEventListener("message", (message) => {
                    if (message.data == "ok") {
                        console.log("Connected to WS server");
                        Elements.game.container.style.display = "block";
                        Elements.game.code.innerText = `Code: ${code}`;
                        Elements.game.leave.addEventListener("click", () => ws.close());
                        return;
                    }

                    if (message.data == "vip") {
                        console.log("You are VIP");
                        Elements.game.startGame.style.display = "block";
                        return;
                    }

                    console.log(`Received message: ${message.data}`);
                });

                ws.addEventListener("close", () => {
                    console.log("Disconnected from WS server");

                    Elements.game.container.style.display = "none";
                    Elements.join.container.style.display = "block";
                    Elements.game.startGame.style.display = "none";
                });
            });
    });
}
