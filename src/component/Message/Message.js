import React from "react";
import "./Message.css";

const Message = ({ user, message, classs, action }) => {
  if (user) {
    if (action) {
      return (
        <div
          className={`messageBox ${action} admin`}
        >{`${user}: ${message}`}</div>
      );
    } else
      return (
        <div className={`messageBox ${classs}`}>{`${user}: ${message}`}</div>
      );
  } else {
    return <div className={`messageBox ${classs}`}>{`You: ${message}`}</div>;
  }
};

export default Message;
