
export class RoomManager {
    rooms: any;
    static instance : RoomManager;

    constructor() {
        this.rooms = new Map();
    };

    static getInstance() {
        if (!this.instance){
            this.instance = new RoomManager();
        };

        return this.instance;
    };

    // Whenever a new user joins the room, we are adding that user class to specific spaceId
    public addUser (spaceId : string, user : any) {
        if (!this.rooms.has(spaceId)) {
            this.rooms.set(spaceId, [user]);
            return;
        };

        this.rooms.set(spaceId, [...this.rooms.get(spaceId), user]);
    };

    public removeUser(user: any, spaceId: string) {
        if (!this.rooms.has(spaceId)) {
            return;
        };

        this.rooms.set(spaceId, this.rooms.get(spaceId).filter((u : any) => u.id !== user.id));
    };

    public broadcast(message: any, user: any, spaceId: string){
        if (!this.rooms.has(spaceId)) {
            return;
        };

        this.rooms.get(spaceId).forEach((u : any) => {
            if (u.id !== user.id) {
                u.send(message);
            }
        })
    }


}