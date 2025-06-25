"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws = new ws_1.WebSocketServer({ port: 8080 });
ws.on("connection", (socket) => {
    console.log("User connected");
    console.log(socket);
    socket.send(JSON.stringify({ msg: "Hello" }));
});
