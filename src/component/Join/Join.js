import React, { useState } from "react";
import "./Join.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

let user = "";

const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};

const Join = () => {
  const [name, setName] = useState("");

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>Chat App</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="joinInput"
          placeholder="Enter Your Name"
        />
        <Link
          onClick={(e) => (name === "" ? e.preventDefault() : null)}
          to="/chat"
        >
          <button onClick={sendUser} className="joinbtn">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
