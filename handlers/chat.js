const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({port : 3001});

const functionByMsgCode = {
    'common' : (wss, ws, data) => {
        for(client of wss.clients){
            client.send(JSON.stringify(dataJson));
        }
    },

}

wss.on("connection", (ws) =>{
    console.log(`연결되었습니다.`);
    console.log(wss.clients.size);
    
    ws.on("close", () => {
        console.log("연결이 끊어졌습니다.");
    }) 

    ws.on("message", data =>{
        const dataJson = JSON.parse(data);
        functionByMsgCode[dataJson.code](wss, ws, dataJson);

        
    });
});  