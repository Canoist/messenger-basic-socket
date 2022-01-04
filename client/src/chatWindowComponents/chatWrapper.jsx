import React from "react";
import Message from "./message";

const ChatWrapper = ({ messages, username }) => {
  return (
    <div className="chat-wrapper">
      {messages.map((mess) => (
        <div key={mess.id}>
          {mess.event === "connection" ? (
            <p className="chat__wrapper__user-connect">Пользователь {mess.username} подключился</p>
          ) : (
            <Message data={mess} username={username} />
          )}
        </div>
      ))}
    </div>
  );
};
export default ChatWrapper;
