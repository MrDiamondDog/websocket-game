import {Elements, isHosting} from "./index.js";
import {Websocket} from "./ws.js";

export let hostingCode = "";

export function initHost() {
    window.addEventListener("close", () => {
        if (isHosting) {
            fetch("/game/" + hostingCode, {
                method: "DELETE"
            });
        }
    });

    Elements.host.createButton.on("click", async () => {
        hostingCode = await fetch("/game", {
            method: "POST",
            body: Elements.host.game.value()
        }).then((res) => res.text());

        Elements.host.container.hide();
        Elements.host.error.hide();
        Elements.game.container.show();
        Elements.game.code.text("Code:", hostingCode);
        Elements.switcher.hide();

        const name = Elements.host.name.value();

        const key = await fetch("/game/" + hostingCode).then((res) => res.text());

        const ws = Websocket.connect(key, hostingCode, name);

        ws.addEventListener("message", (message) => {
            if (message.data == "ok") {
                console.log("Connected to WS server");
                return;
            }

            if ((message.data as string).startsWith("player:")) {
                const name = (message.data as string).split(":")[1];
                const elem = document.createElement("div");
                elem.textContent = name;
                Elements.game.players.element.appendChild(elem);
                return;
            }
        });

        Elements.game.leave.on("click", () => {
            fetch("/game/" + hostingCode, {
                method: "DELETE"
            }).then(() => {
                Elements.game.container.hide();
                Elements.host.container.show();
            });
        });
    });
}
