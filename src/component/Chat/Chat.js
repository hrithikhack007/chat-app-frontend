import React, { useState } from "react";
import socketIo from "socket.io-client";
import { useEffect } from "react";
import "./Chat.css";
import sendLogo from "../../images/send.png";
import Message from "../Message/Message.js";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
import { useLocation } from "react-router-dom";
import CurrentUsers from "../CurrentUsers/CurrentUsers.js";

let socket;

const ENDPOINT = "https://chat-app-backend-rust.vercel.app/";
// const ENDPOINT = "http://localhost:4500";

const Chat = () => {
  const search = useLocation().search;

  const user = new URLSearchParams(search).get("user");
  const room = new URLSearchParams(search).get("room");

  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [toggleActive, setToggleActive] = useState(false);

  const toggle = () => {
    setToggleActive(!toggleActive);
  };
  const send = () => {
    const message = document.getElementById(`chatInput`).value;
    socket.emit("message", {
      message,
      id,
      room,
    });
    document.getElementById(`chatInput`).value = "";
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      setId(socket.id);
    });

    socket.emit("roomJoined", { user, room });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
    });
  }, []);

  const disconnect = () => {
    socket.emit("disconnected", { id });
    socket.off();
  };

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      // console.log(data.time);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
    });

    socket.on("roomUsers", (data) => {
      setUsers(data.users);
    });

    return () => {
      socket.off();
    };
  }, [messages, users]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>{`${room}`}</h2>
          <div className="activeUsers">
            <span>Active users</span>
            <p>{users.length}</p>
          </div>
          <a href="/">
            <img onClick={disconnect} src={closeIcon} alt="Close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          <div className="messageContainer">
            {messages.map((item, i) => (
              <Message
                key={i}
                message={item.message}
                classs={item.id === id ? "right" : "left"}
                user={item.id === id ? "" : item.user}
                time={item.time}
                action={item.action}
              />
            ))}
          </div>
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
