import React, { useState, useEffect, useContext } from "react";
import RoomCard from "../../components/RoomCard/RoomCard";
import Style from "./FirstPage.module.css";

import { useNavigate } from "react-router-dom";
import SocketContext from "../../contexte/socketContext";

export default function FirstPage() {
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/rooms")
      .then((res) => res.json())
      .then((res) => {
        setRooms(res);
      });
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("error", (data) => {
      navigate("/");
    });
    socket.on("disconnect", () => {});

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className={Style.containerRooms}>
      {rooms.map((room) => (
        <RoomCard room={room} socket={socket} />
      ))}
    </div>
  );
}
