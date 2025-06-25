import { Shape } from "./types";
import { User } from "./User";

export class Room {
  public roomId: number;
  public users: User[];
  public shapes: Shape[];

  constructor(roomId: number) {
    this.roomId = roomId;
    this.users = [];
    this.shapes = [];
  }

  addUser(user: User) {}

  removeUser() {}

  clearAllShapes() {
    this.shapes = [];
  }
}
