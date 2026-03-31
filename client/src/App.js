import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "history") {
        setMessages(data.data);
      } else {
        setMessages((prev) => [...prev, data.data]);
      }
    };

    setSocket(ws);
  }, []);

  const sendMessage = () => {
    if (input && socket) {
      socket.send(input);
      setInput("");
    }
  };

  return (
    <div>
      <h2>Chat App</h2>
      {messages.map((msg, i) => <div key={i}>{msg}</div>)}
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
