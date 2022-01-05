import React, { useRef, useState } from "react";
import ConnectUserWindow from "./connectUserWindow";
import Chat from "./chatWindowComponents/chat";
import DialogList from "./dialogsComponents/dialogList";

const Messenger = () => {
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  const handleValue = (newValue) => {
    setValue(newValue);
  };

  const dialogsBase = [
    {
      _id: 1,
      name: "Chat 1"
    },
    {
      _id: 2,
      name: "Chat 2"
    },
    {
      _id: 3,
      name: "Chat 3"
    }
  ];
  const dialogs = dialogsBase.slice();

  const handleDialogChange = (id) => {
    const dialogId = dialogs.findIndex((c) => c._id === id);
    setDialogCheck(dialogs[dialogId]);
  };

  const [dialogCheck, setDialogCheck] = useState(dialogs[0]);

  const handleSetUsername = (userName) => {
    setUsername(userName);
  };

  const handleConnect = () => {
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
  };

  if (!connected) {
    return (
      <ConnectUserWindow value={username} connect={handleConnect} setUserName={handleSetUsername} />
    );
  }

  return (
    connected && (
      <div className="messenger">
        <DialogList dialogs={dialogs} toggleDialog={handleDialogChange} />
        <Chat
          dialog={dialogCheck}
          connect={handleConnect}
          setUserName={handleSetUsername}
          messages={messages}
          connected={connected}
          username={username}
          socket={socket}
          value={value}
          resetValue={handleValue}
        />
      </div>
    )
  );
};
export default Messenger;
