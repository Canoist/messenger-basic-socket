import React, { useState } from "react";
import Chat from "./chatWindowComponents/chat";
import DialogList from "./dialogsComponents/dialogList";

const Messenger = () => {
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
  return (
    <div className="messenger">
      <DialogList dialogs={dialogs} toggleDialog={handleDialogChange} />
      <Chat dialog={dialogCheck} />
    </div>
  );
};
export default Messenger;
