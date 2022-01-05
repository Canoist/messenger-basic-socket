import { WebSocketServer } from "ws";

const wss = new WebSocketServer(
  {
    port: 8000
  },
  () => console.log(`Server started`)
);

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    // ws.id = Date.now();
    message = JSON.parse(message);
    switch (message.event) {
      case "message":
        broadcastMessage(message);
        break;
      case "connection":
        broadcastMessage(message);
        break;
    }
  });
});

function broadcastMessage(mess) {
  wss.clients.forEach((client) => {
    // if (client.id === id) {
    // Добавить id в скобки
    client.send(JSON.stringify(mess));
    // }
  });
}

const message = {
  event: "message/connection",
  id: 123,
  date: "21.01.2021",
  username: "Canoist",
  message: "Hello world!"
};
