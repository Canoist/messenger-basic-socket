import React, { useRef, useState } from "react";
import ConnectUserWindow from "../connectUserWindow";
import ChatWrapper from "./chatWrapper";
import InputMessage from "./inputMessage";

const Chat = ({ dialog }) => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");

  function handleValue(newValue) {
    setValue(newValue);
  }

  function handleConnect() {
    socket.current = new WebSocket("ws://localhost:8000");
    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now()
      };
      socket.current.send(JSON.stringify(message));
      // Отправляем сообщение message на сервер
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    socket.current.onclose = () => {};
    socket.current.onerror = () => {
      console.log("Socket error");
    };
  }

  function hadleSetUsername(userName) {
    setUsername(userName);
  }

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: "message"
    };
    socket.current.send(JSON.stringify(message));
    setValue("");
  };

  if (!connected) {
    return (
      <ConnectUserWindow value={username} connect={handleConnect} setUserName={hadleSetUsername} />
    );
  }

  return (
    <div className="chat px-2">
      <nav>{dialog.name}</nav>
      <ChatWrapper messages={messages} username={username} />

      <InputMessage value={value} setValue={handleValue} sendMessage={sendMessage} />
    </div>
  );
};
export default Chat;
