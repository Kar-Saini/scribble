"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(userId, socket) {
        this.userId = userId;
        this.socket = socket;
        this.shapes = [];
    }
}
exports.User = User;
