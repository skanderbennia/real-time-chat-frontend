import React, { useEffect, useRef, useState } from "react";
import Style from "./ChatSection.module.css";
import { useContext } from "react";
import SocketContext from "../../../../contexte/socketContext";
import Message from "./components/Message/Message";
import RoomContext from "../../../../contexte/roomContext";
import SnackBar from "../../../../Shared/SnackBar/SnackBar";

export default function ChatSection() {
  const { socket } = useContext(SocketContext);
  const { username } = useContext(RoomContext);
  const [snackBarInfo, setSnackarInfo] = useState({ sender: null, text: null });
  const notifRef = useRef();
  const [listMessage, setListMessage] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setListMessage([...listMessage, message]);
      notifRef.current.play();
      setSnackarInfo({ sender: message.sender, text: message.text });
    });
  }, [listMessage]);
  useEffect(() => {
    notifRef.current.volume = 0.05;
  }, [notifRef]);

  return (
    <div>
      <SnackBar {...snackBarInfo} />
      <audio src="http://localhost:3000/receivemessage.mp3" ref={notifRef} />
      <div className={Style.topSection}></div>
      <div className={Style.allChat}>
        {listMessage.map((message, index) => (
          <Message text={message.text} sender={message.sender} />
        ))}
      </div>
      <input
        className={Style.writeMessage}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            const messageObject = {
              text: e.target.value,
              sender: username,
            };

            socket.emit("sendMessage", messageObject);
            setListMessage([...listMessage, messageObject]);
            e.target.value = "";
          }
        }}
      />
    </div>
  );
}
