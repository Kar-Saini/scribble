import { WebSocketServer, WebSocket as ServerWebSocket } from "ws";
import { INCOMMING_MESSAGE } from "./types";
import { RoomManager } from "./RoomManager";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket: ServerWebSocket) => {
  const userId = Math.floor(Math.random() * 1_000_000).toString();
  sendMessage(socket, "user_connected", { userId });

  socket.on("message", (rawData) => {
    let parsedData: INCOMMING_MESSAGE;
    try {
      parsedData = JSON.parse(rawData.toString());
    } catch (err) {
      console.error("Invalid JSON received:", err);
      return sendError(socket, "Invalid JSON format");
    }

    const roomManager = RoomManager.getInstance();

    switch (parsedData.type) {
      case "create_room": {
        const { adminName, adminId } = parsedData.payload;
        roomManager.createRoom(adminName, adminId, socket);
        break;
      }

      case "join_room": {
        const { roomId, userId, shapes } = parsedData.payload;
        const room = roomManager.getRoom(roomId);
        if (!room) return sendError(socket, "Invalid room ID");
        room.addUser({ userId, socket, shapes });
        break;
      }

      case "delete_room": {
        const { roomId } = parsedData.payload;
        const deleted = roomManager.deleteRoom(roomId);
        sendMessage(socket, deleted ? "room_deleted" : "error", {
          message: deleted ? "Room deleted" : "Invalid room ID",
        });
        break;
      }

      case "leave_room": {
        const { roomId, userId } = parsedData.payload;
        const room = roomManager.getRoom(roomId);
        if (!room) return sendError(socket, "Room not found");
        room.removeUser(userId);
        break;
      }

      default:
        sendError(socket, "Unsupported message type");
    }
  });
});

function sendMessage(socket: ServerWebSocket, type: string, payload: any) {
  socket.send(JSON.stringify({ type, payload }));
}

function sendError(socket: ServerWebSocket, message: string) {
  sendMessage(socket, "error", { message });
}
