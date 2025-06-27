import { Room } from "./Room";
import { WebSocket } from "ws";
import { User } from "./User";

export class RoomManager {
  private static instance: RoomManager;
  private rooms: Map<string, Room> = new Map();

  private constructor() {}

  public static getInstance(): RoomManager {
    if (!RoomManager.instance) {
      RoomManager.instance = new RoomManager();
    }
    return RoomManager.instance;
  }

  public createRoom(
    adminName: string,
    adminId: string,
    socket: WebSocket
  ): void {
    const roomId = Math.floor(Math.random() * 100_000).toString();
    const room = new Room(roomId, adminId, adminName);
    room.addUser(new User(adminId, socket));
    room.broadcastAll({
      type: "room_created",
      payload: { roomId, adminId, adminName, size: room.userCount() },
    });
    this.rooms.set(roomId, room);
  }

  public getRoom(roomId: string): Room | undefined {
    return this.rooms.get(roomId);
  }

  public deleteRoom(roomId: string): boolean {
    return this.rooms.delete(roomId);
  }
}
