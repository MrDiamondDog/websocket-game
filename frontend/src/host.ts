import {Elements, isHosting} from "./index.js";

export let hostingCode = "";

export function initHost() {
    window.addEventListener("close", () => {
        if (isHosting) {
            fetch("/game/" + hostingCode, {
                method: "DELETE"
            });
        }
    });

    Elements.host.createButton.addEventListener("click", async () => {
        hostingCode = await fetch("/game", {
            method: "POST",
            body: Elements.host.game.value
        }).then((res) => res.text());

        Elements.host.container.style.display = "none";
        Elements.host.error.style.display = "none";
        Elements.game.container.style.display = "block";
        Elements.game.code.innerText = `Code: ${hostingCode}`;
        Elements.switcher.style.display = "none";

        Elements.game.leave.addEventListener("click", () => {
            fetch("/game/" + hostingCode, {
                method: "DELETE"
            }).then(() => {
                Elements.game.container.style.display = "none";
                Elements.host.container.style.display = "block";
            });
        });
    });
}
