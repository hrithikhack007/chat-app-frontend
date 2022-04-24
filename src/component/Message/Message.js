import React from "react";
import "./Message.css";

const Message = ({ user, message, classs, action, time }) => {
  if (user) {
    if (action) {
      return (
        <div className={`messageBox ${action} admin`}>
          <p className={`time ${classs}t`}>{time}</p>
          {`${user}: ${message}`}
        </div>
      );
    } else
      return (
        <div className={`messageBox ${classs}`}>
          <p className={`time ${classs}t`}>{time}</p>
          {`${user}: ${message}`}
        </div>
      );
  } else {
    return (
      <div className={`messageBox ${classs}`}>
        <p className={`time ${classs}t`}>{time}</p>
        {`You: ${message}`}
      </div>
    );
  }
};

export default Message;
