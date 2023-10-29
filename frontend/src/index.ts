import {initHost} from "./host.js";
import {initJoin} from "./join.js";
import {elem} from "./utils.js";

export const Elements = {
    switcher: elem<HTMLButtonElement>("#switcher"),
    join: {
        container: elem("#join"),
        codeInput: elem<HTMLInputElement>("#join-code"),
        nameInput: elem<HTMLInputElement>("#join-name"),
        joinButton: elem<HTMLButtonElement>("#join-button"),
        error: elem("#join-error")
    },
    host: {
        container: elem("#host"),
        createButton: elem<HTMLButtonElement>("#host-button"),
        game: elem<HTMLSelectElement>("#host-game"),
        code: elem("#host-code"),
        error: elem("#host-error")
    },
    game: {
        container: elem("#game"),
        code: elem("#game-code"),
        startGame: elem<HTMLButtonElement>("#game-start"),
        leave: elem<HTMLButtonElement>("#game-leave")
    }
};

export let isHosting = false;
Elements.switcher.addEventListener("click", () => {
    isHosting = !isHosting;
    Elements.switcher.innerText = isHosting ? "Join" : "Host";
    Elements.join.container.style.display = isHosting ? "none" : "block";
    Elements.host.container.style.display = isHosting ? "block" : "none";
});

initJoin();
initHost();
