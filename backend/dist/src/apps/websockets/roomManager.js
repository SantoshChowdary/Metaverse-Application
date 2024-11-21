"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
class RoomManager {
    constructor() {
        this.rooms = new Map();
    }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new RoomManager();
        }
        ;
        return this.instance;
    }
    ;
    // Whenever a new user joins the room, we are adding that user class to specific spaceId
    addUser(spaceId, user) {
        if (!this.rooms.has(spaceId)) {
            this.rooms.set(spaceId, [user]);
            return;
        }
        ;
        this.rooms.set(spaceId, [...this.rooms.get(spaceId), user]);
    }
    ;
    removeUser(user, spaceId) {
        if (!this.rooms.has(spaceId)) {
            return;
        }
        ;
        this.rooms.set(spaceId, this.rooms.get(spaceId).filter((u) => u.id !== user.id));
    }
    ;
    broadcast(message, user, spaceId) {
        if (!this.rooms.has(spaceId)) {
            return;
        }
        ;
        this.rooms.get(spaceId).forEach((u) => {
            if (u.id !== user.id) {
                u.send(message);
            }
        });
    }
}
exports.RoomManager = RoomManager;
