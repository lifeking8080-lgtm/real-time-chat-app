const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5000 });

let messages = [];

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ type: "history", data: messages }));

  ws.on("message", (message) => {
    const msg = message.toString();
    messages.push(msg);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "message", data: msg }));
      }
    });
  });
});
