"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
class Room {
    constructor(roomId, adminId, adminName) {
        this.roomId = roomId;
        this.adminId = adminId;
        this.adminName = adminName;
        this.users = new Map();
        this.shapes = [];
    }
    addUser(user) {
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
    removeUser(userId) {
        this.users.delete(userId);
    }
    broadcast(message, excludeUserId) {
        for (const [id, user] of this.users) {
            if (id !== excludeUserId) {
                user.socket.send(JSON.stringify(message));
            }
        }
    }
    broadcastAll(message) {
        this.broadcast(message);
    }
    userCount() {
        return this.users.size;
    }
}
exports.Room = Room;
