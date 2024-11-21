import { WebSocketServer} from "ws";

const wss = new WebSocketServer( {port : 3001} );

wss.on("connection", (ws) => {

    ws.on("error", () => console.log("ws error"));

    
})