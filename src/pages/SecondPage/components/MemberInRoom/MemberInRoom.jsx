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
  const [hoverDisconnect, setHoverDisconnect] = useState(false);

  useEffect(() => {
    setUsers([...users, { name: room.name + "'s Bot" }]);
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((res) => {
        setUsers([{ name: room.name + "'s Bot" }, ...res]);
      });
    socket.on("userJoined", (connectedUsers) => {
      setUsers([...users, ...connectedUsers]);
    });
    socket.on("userLeft", (connectedUsers) => {
      setUsers([...connectedUsers, { name: room.name + "'s Bot" }]);
    });
  }, [room]);
  return (
    <div className={Style.container}>
      {/* audio door */}
      {hoverDisconnect && (
        <audio
          src="http://localhost:3000/door.mp3"
          autoPlay={true}
          loop={true}
          volume={0}
        >
          Your browser does not support the <code>audio</code> element.
        </audio>
      )}

      <h1>{room.name}</h1>
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
        onMouseEnter={() => {
          setHoverDisconnect(true);
        }}
        onMouseLeave={() => {
          setHoverDisconnect(false);
        }}
        className={Style.buttonDisconnect}
        onClick={() => {
          socket.disconnect();
          navigate("/");
        }}
      >
        Disconnect
      </div>
    </div>
  );
}
