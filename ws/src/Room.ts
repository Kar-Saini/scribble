import { OUTGOING_MESSAGE, Shape } from "./types";
import { User } from "./User";

export class Room {
  private users: Map<string, User> = new Map();
  private shapes: Shape[] = [];

  constructor(
    public readonly roomId: string,
    public readonly adminId: string,
    public readonly adminName: string
  ) {}

  public addUser(user: User): void {
    if (!this.users.has(user.userId)) {
      this.users.set(user.userId, user);
    }
    this.broadcastAll({
      type: "user_joined",
      payload: {
        roomId: this.roomId,
        adminId: this.adminId,
        adminName: this.adminName,
        size: this.users.size,
      },
    });
  }

  public removeUser(userId: string): void {
    this.users.delete(userId);
  }

  public broadcast(message: OUTGOING_MESSAGE, excludeUserId?: string): void {
    for (const [id, user] of this.users) {
      if (id !== excludeUserId) {
        user.socket.send(JSON.stringify(message));
      }
    }
  }

  public broadcastAll(message: OUTGOING_MESSAGE): void {
    this.broadcast(message);
  }

  public userCount(): number {
    return this.users.size;
  }
}
