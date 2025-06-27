import { Shape } from "./types";
import { WebSocket as ServerWebSocket } from "ws";
export class User {
  public userId: string;
  public socket: ServerWebSocket;
  public shapes: Shape[];

  constructor(userId: string, socket: ServerWebSocket) {
    this.userId = userId;
    this.socket = socket;
    this.shapes = [];
  }
}
