import React, { useState } from "react";
import { user } from "../Join/Join.js";
import socketIo from "socket.io-client";
import { useEffect } from "react";
import "./Chat.css";
import sendLogo from "../../images/send.png";
import Message from "../Message/Message.js";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";

let socket;

const ENDPOINT = "https://sasta-tinder.herokuapp.com/";
// const ENDPOINT = "http://localhost:4500";

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const send = () => {
    const message = document.getElementById(`chatInput`).value;
    socket.emit("message", {
      message,
      id,
    });
    document.getElementById(`chatInput`).value = "";
  };

  // console.log(messages);

  useEffect(() => {
    socket = socketIo(ENDPOINT, {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    });
  }, []);

  const disconnect = () => {
    socket.emit("disconnected", { id });
    socket.off();
  };

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message, data.id);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>Chat App</h2>
          <a href="/">
            <img onClick={disconnect} src={closeIcon} alt="Close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              key={i}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
              user={item.id === id ? "" : item.user}
              action={item.action}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
            type="text"
            id="chatInput"
          />
          <button onClick={send} className="sendBtn">
            <img src={sendLogo} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
