import { Shape } from "./types";

export class User {
  public name: string;
  public userId: string;
  public ws: WebSocket;
  public shapes: Shape[];
  public roomId: number;

  constructor(name: string, userId: string, ws: WebSocket, roomId: number) {
    this.name = name;
    this.userId = userId;
    this.ws = ws;
    this.shapes = [];
    this.roomId = roomId;
  }
}
