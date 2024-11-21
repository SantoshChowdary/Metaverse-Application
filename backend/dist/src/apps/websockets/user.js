"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const roomManager_1 = require("./roomManager");
const index_1 = __importDefault(require("../../db/index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../httpService/config");
function randomIdGenerator(len) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
;
class User {
    constructor(ws) {
        this.id = randomIdGenerator(10);
        this.ws = ws;
        this.x = 0;
        this.y = 0;
        this.initHandlers();
    }
    ;
    initHandlers() {
        this.ws.on("message", (data) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const parsedData = JSON.parse(data.toString());
            // switch case for multiple types
            switch (parsedData.type) {
                case "join":
                    const spaceId = parsedData.payload.spaceId;
                    const token = parsedData.payload.token;
                    const userId = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD).userId;
                    if (!userId) {
                        this.ws.close();
                        return;
                    }
                    ;
                    this.userId = userId;
                    const space = yield index_1.default.space.findFirst({
                        where: {
                            id: spaceId
                        }
                    });
                    if (!space) {
                        this.ws.close();
                        return;
                    }
                    ;
                    this.spaceId = spaceId;
                    roomManager_1.RoomManager.getInstance().addUser(spaceId, this);
                    this.x = Math.floor(Math.random() * space.width);
                    this.y = Math.floor(Math.random() * space.height);
                    this.ws.send(JSON.stringify({
                        type: "space-joined",
                        payload: {
                            spawn: {
                                x: this.x,
                                y: this.y
                            },
                            users: (_b = (_a = roomManager_1.RoomManager.getInstance().rooms.get(spaceId)) === null || _a === void 0 ? void 0 : _a.filter((x) => x.id !== this.id)) === null || _b === void 0 ? void 0 : _b.map((u) => ({ id: u.id }))
                        }
                    }));
                    roomManager_1.RoomManager.getInstance().broadcast({
                        type: "user-joined",
                        payload: {
                            userId: this.userId,
                            x: this.x,
                            y: this.y
                        }
                    }, this, this.spaceId);
                    break;
                case "move":
                    const moveX = parsedData.payload.x;
                    const moveY = parsedData.payload.y;
                    const isMoveX = Math.abs(this.x - moveX);
                    const isMoveY = Math.abs(this.y - moveY);
                    if ((isMoveX === 1 && isMoveY === 0) || (isMoveX === 0 && isMoveY === 1)) {
                        this.x = moveX;
                        this.y = moveY;
                        roomManager_1.RoomManager.getInstance().broadcast({
                            type: "movement",
                            payload: {
                                x: this.x,
                                y: this.y
                            }
                        }, this, this.spaceId);
                        return;
                    }
                    else {
                        this.ws.send(JSON.stringify({
                            type: "movement-rejected",
                            payload: {
                                x: this.x,
                                y: this.y
                            }
                        }));
                    }
                    break;
            }
        }));
    }
    ;
    destroy() {
        roomManager_1.RoomManager.getInstance().broadcast({
            type: "user-left",
            payload: {
                userId: this.userId
            }
        }, this, this.spaceId);
        roomManager_1.RoomManager.getInstance().removeUser(this, this.spaceId);
    }
}
exports.User = User;
