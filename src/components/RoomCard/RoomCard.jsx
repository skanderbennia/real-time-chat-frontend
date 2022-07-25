import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import RoomContext from "../../contexte/roomContext";
import StyleSheet from "./RoomCard.module.css";

import Button from "../../Shared/Button/Button";

export default function RoomCard(props) {
  const neonRef = useRef();
  const navigate = useNavigate();
  const { setRoom, setUsername } = useContext(RoomContext);
  const [unMute, setunMute] = useState(false);
  const joinChat = () => {
    const name = prompt("Enter your name", "Anonymous");
    props.socket.emit("join", { name });
    setRoom(props.room);
    setUsername(name);
    navigate("/chat/" + props.room.id);
  };

  return (
    <div
      className={StyleSheet.container}
      onMouseEnter={() => {
        setunMute(true);
      }}
      onMouseLeave={() => {
        setunMute(false);
      }}
    >
      <audio
        src="http://localhost:3000/neon.mp3"
        autoPlay={true}
        loop={true}
        muted={!unMute}
        volume={0}
        ref={neonRef}
      >
        Your browser does not support the <code>audio</code> element.
      </audio>
      <span className={StyleSheet.titleRoom}> {props.room.name}</span>
      <div className={StyleSheet.connectedUsers}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4195/4195791.png"
          alt="user"
          className={StyleSheet.userIcon}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/4195/4195791.png"
          alt="user"
          className={StyleSheet.userIcon}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/4195/4195791.png"
          alt="user"
          className={StyleSheet.userIcon}
        />
      </div>
      <div className={StyleSheet.buttonPanel}>
        {/* lock icon */}

        <Button onClick={joinChat} />
      </div>
    </div>
  );
}
