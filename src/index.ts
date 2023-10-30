import "./websocket";
import "./server";
import "dotenv/config";
import ngrok from "ngrok";

(async () => {
    const usingNgrok = process.argv.slice(2).join(" ").includes("ngrok");
    if (usingNgrok) {
        console.log("Connecting to ngrok");
        const http = await ngrok.connect({
            proto: "http",
            addr: 8000,
            authtoken: process.env.NGROK_TOKEN,
            subdomain: "maximum-ideally-mackerel"
        });

        const tcp = await ngrok.connect({
            proto: "tcp",
            addr: 8080,
            authtoken: process.env.NGROK_TOKEN
        });
    }
})();
