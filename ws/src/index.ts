import { WebSocketServer } from "ws";
import { Shape } from "./types";

const ws = new WebSocketServer({ port: 8080 });

ws.on("connection", (socket) => {
  console.log("User connected");
  socket.send(JSON.stringify({ msg: "Hello" }));
});
