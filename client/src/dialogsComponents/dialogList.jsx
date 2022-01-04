import React from "react";
import Dialog from "./dialog";

const DialogList = ({ dialogs, toggleDialog }) => {
  return (
    <div className="dialog-list">
      {dialogs.map((dialog) => (
        <Dialog chat={dialog} key={dialog._id} toggleDialog={toggleDialog} />
      ))}
    </div>
  );
};
export default DialogList;
