import React from "react";

const Dialog = ({ chat, toggleDialog }) => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-info m-2 dialog-list-item"
        onClick={() => {
          toggleDialog(chat._id);
        }}
      >
        <p>{chat.name}</p>
      </button>
    </div>
  );
};
export default Dialog;
