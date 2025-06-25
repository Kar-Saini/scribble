import { Room } from "./Room";

export class RoomManager {
  public rooms: Room[];
  static instance: RoomManager;
  private constructor() {
    this.rooms = [];
  }

  public static getInstance() {
    if (!RoomManager.instance) {
      this.instance = new RoomManager();
    }
    return RoomManager.instance;
  }
  createRoom() {
    const roomId = Math.ceil(Math.random() + 1000);
    const newroom = new Room(roomId);
    this.rooms.push(newroom);
  }
  deleteRoom(roomId: number) {
    this.rooms = this.rooms.filter((room) => room.roomId !== roomId);
  }
}
