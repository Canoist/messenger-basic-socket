import React from "react";
import moment from "moment";

const Message = ({ data, username }) => {
  return (
    <div className={`${data.username === username ? "right-side" : ""}`}>
      <h4 className={`chat-wrapper__message`}>
        <p>{data.username}</p>
        <p>{moment(data.id).format("LLL")}</p>
      </h4>
      <span className="btn btn-info text-dark message">{data.message}</span>
    </div>
  );
};
export default Message;
