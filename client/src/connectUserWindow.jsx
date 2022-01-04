import React from "react";

const ConnectUserWindow = ({ value, connect, setUserName }) => {
  return (
    <div className="wrapper">
      <div className="input-group mb-3">
        <input
          value={value}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Your's username"
        />
        <button
          onClick={connect}
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Join
        </button>
      </div>
    </div>
  );
};
export default ConnectUserWindow;
