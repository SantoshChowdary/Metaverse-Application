import { WebSocket } from "ws";
import { RoomManager } from "./roomManager";
import client  from "../../db/index";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../httpService/config";

function randomIdGenerator(len: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

export class User {
    public id: string;
    public userId? : string;
    private spaceId? : string;
    private x: number;
    private y: number;
    private ws: WebSocket;

    constructor(ws : WebSocket) {
        this.id = randomIdGenerator(10);
        this.ws = ws;
        this.x = 0;
        this.y = 0;
        this.initHandlers();
    };

    initHandlers() {
        this.ws.on("message", async (data) => {
            const parsedData = JSON.parse(data.toString());

            // switch case for multiple types

            switch (parsedData.type) {
                case "join":
                    const spaceId = parsedData.payload.spaceId;
                    const token = parsedData.payload.token;
                    const userId = (jwt.verify(token, JWT_PASSWORD) as any).userId;

                    if (!userId){
                        this.ws.close();
                        return;
                    };

                    this.userId = userId;

                    const space = await client.space.findFirst({
                        where : {
                            id : spaceId
                        }
                    });

                    if (!space){
                        this.ws.close();
                        return;
                    };

                    this.spaceId = spaceId;

                    RoomManager.getInstance().addUser(spaceId, this);

                    this.x = Math.floor(Math.random() * space.width);
                    this.y = Math.floor(Math.random() * space.height);

                    this.ws.send(JSON.stringify({
                        type : "space-joined",
                        payload : {
                            spawn : {
                                x : this.x,
                                y : this.y
                            },
                            users : RoomManager.getInstance().rooms.get(spaceId)?.filter((x: any) => x.id !== this.id)?.map((u: any) => ({id : u.id}))
                        }
                    }));

                    RoomManager.getInstance().broadcast({
                        type : "user-joined",
                        payload : {
                            userId : this.userId,
                            x : this.x,
                            y : this.y
                        }
                    }, this, this.spaceId!);
                    break;
                
                case "move":

                    const moveX = parsedData.payload.x;
                    const moveY = parsedData.payload.y;

                    const isMoveX = Math.abs(this.x - moveX);
                    const isMoveY = Math.abs(this.y - moveY);

                    if ( (isMoveX === 1 && isMoveY === 0) || (isMoveX === 0 && isMoveY === 1)){
                        this.x = moveX;
                        this.y = moveY;

                        RoomManager.getInstance().broadcast({
                            type : "movement",
                            payload : {
                                x : this.x,
                                y : this.y
                            }
                        }, this, this.spaceId!);
                        return;
                    } else {
                        this.ws.send(JSON.stringify({
                            type : "movement-rejected",
                            payload : {
                                x : this.x,
                                y : this.y
                            }
                        }))
                    }
                    break;
            }
        });
    };

    destroy() {
        RoomManager.getInstance().broadcast({
            type : "user-left",
            payload : {
                userId : this.userId
            }
        }, this, this.spaceId!);

        RoomManager.getInstance().removeUser(this, this.spaceId!);
    }
}