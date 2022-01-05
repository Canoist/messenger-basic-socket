import React, { useState } from "react";
import ConnectUserWindow from "../connectUserWindow";
import ChatWrapper from "./chatWrapper";
import InputMessage from "./inputMessage";

const Chat = ({ dialog, connected, username, socket, ...rest }) => {
  const [value, setValue] = useState("");

  function handleValue(newValue) {
    setValue(newValue);
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
    return <ConnectUserWindow value={username} {...rest} />;
  }

  return (
    connected && (
      <div className="chat px-2">
        <nav>{dialog.name}</nav>
        <ChatWrapper {...rest} username={username} />
        <InputMessage value={value} setValue={handleValue} sendMessage={sendMessage} />
      </div>
    )
  );
};
export default Chat;
