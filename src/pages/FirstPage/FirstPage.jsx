import React, { useState, useEffect, useContext, useRef } from "react";
import io from "socket.io-client";
import RoomCard from "../../components/RoomCard/RoomCard";
import Style from "./FirstPage.module.css";

import { useNavigate } from "react-router-dom";
import SocketContext from "../../contexte/socketContext";

export default function FirstPage() {
  const navigate = useNavigate();
  const { socket, setSocket } = useContext(SocketContext);
  const introMusicRef = useRef();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const socketVar = io.connect("http://localhost:4000");
    setSocket(socketVar);
    fetch("http://localhost:4000/rooms")
      .then((res) => res.json())
      .then((res) => {
        setRooms(res);
      });
    socketVar.on("connect", () => {});
    socketVar.on("error", (data) => {
      navigate("/");
    });
    socketVar.on("disconnect", () => {});

    // return () => {
    //   socketVar.off("connect");
    //   socketVar.off("disconnect");
    // };
  }, []);
  useEffect(() => {
    introMusicRef.current.volume = 0;
  }, [introMusicRef]);
  return (
    <div className={Style.containerRooms}>
      <audio
        src="http://localhost:3000/intromusic.mp3"
        autoPlay={true}
        ref={introMusicRef}
        loop={true}
      />
      {rooms.map((room) => (
        <RoomCard room={room} socket={socket} />
      ))}
    </div>
  );
}
