import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomContext from "../../../../contexte/roomContext";
import SocketContext from "../../../../contexte/socketContext";

import Style from "./MemberInRoom.module.css";

export default function MemberInRoom() {
  const navigate = useNavigate();
  const { room, username } = useContext(RoomContext);
  const { socket } = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
      });
    socket.on("userJoined", (users) => {
      setUsers(users);
    });
    socket.on("userLeft", (users) => {
      setUsers(users);
    });
  }, [room]);
  return (
    <div className={Style.container}>
      <h1
        style={{
          backgroundColor: "orange",
          height: 80,
          display: "flex",
          alignItems: "center",
          padding: "0 20px ",
        }}
      >
        {room.name}
      </h1>
      <div className={Style.groupUserContainer}>
        {users.map((user) => (
          <div className={Style.userContainer}>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4195/4195791.png"
                alt="user"
                width="32"
                height="32"
                className={Style.userIcon}
              />
              <span className={Style.username}>
                {user.name} {user.name === username ? "(Me)" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          backgroundColor: "orange",
          height: "100px",
          padding: "0 150px ",
          width: "100%",
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => {
          socket.emit("leave");
          navigate("/");
        }}
      >
        Disconnect
      </div>
    </div>
  );
}
