export const Websocket = {
    connect(key: string, code: string, name: string): WebSocket {
        return new WebSocket(
            `ws://${window.location.hostname}:8080?key=${key}&code=${code}&name=${name}`
        );
    }
};
