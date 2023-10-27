import {elem} from "./utils.js";

export const Elements = {
    join: {
        container: elem("#join"),
        codeInput: elem<HTMLInputElement>("#join-code"),
        joinButton: elem<HTMLButtonElement>("#join"),
        error: elem("#join-error")
    },
    game: {
        container: elem("#game"),
        code: elem("#game-code"),
        leave: elem<HTMLButtonElement>("#game-leave")
    }
};

Elements.join.joinButton.addEventListener("click", () => {
    const code = Elements.join.codeInput.value;

    fetch("/game/" + code)
        .then((res) => {
            if (!res.ok) {
                Elements.join.error.innerText = "Game not found";
                return;
            }

            return res.text();
        })
        .then((key) => {
            if (key === undefined) {
                return;
            }

            Elements.join.container.style.display = "none";
            Elements.join.error.style.display = "none";

            const ws = new WebSocket(`ws://localhost:8080?key=${key}&code=${code}`);

            ws.addEventListener("message", (message) => {
                if (message.data == "ok") {
                    console.log("Connected to WS server");
                    Elements.game.container.style.display = "block";
                    Elements.game.code.innerText = `Code: ${code}`;
                    Elements.game.leave.addEventListener("click", () => ws.close());
                    return;
                }
                console.log(`Received message: ${message.data}`);
            });

            ws.addEventListener("close", () => {
                console.log("Disconnected from WS server");

                Elements.game.container.style.display = "none";
                Elements.join.container.style.display = "block";
            });
        });
});
