"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
const Room_1 = require("./Room");
const User_1 = require("./User");
class RoomManager {
    constructor() {
        this.rooms = new Map();
    }
    static getInstance() {
        if (!RoomManager.instance) {
            RoomManager.instance = new RoomManager();
        }
        return RoomManager.instance;
    }
    createRoom(adminName, adminId, socket) {
        const roomId = Math.floor(Math.random() * 100000).toString();
        const room = new Room_1.Room(roomId, adminId, adminName);
        room.addUser(new User_1.User(adminId, socket));
        room.broadcastAll({
            type: "room_created",
            payload: { roomId, adminId, adminName, size: room.userCount() },
        });
        this.rooms.set(roomId, room);
    }
    getRoom(roomId) {
        return this.rooms.get(roomId);
    }
    deleteRoom(roomId) {
        return this.rooms.delete(roomId);
    }
}
exports.RoomManager = RoomManager;
