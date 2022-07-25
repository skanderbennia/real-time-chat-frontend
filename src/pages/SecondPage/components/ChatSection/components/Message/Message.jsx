import React from "react";
import Style from "./Message.module.css";
export default function Message(props) {
  return (
    <div className={Style.messageContainer}>
      <div className={Style.sender}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4195/4195791.png"
          alt="user"
          className={StyleSheet.userIcon}
        />
        <span>{props.sender}</span>
        <span>{Date().toString().split("GMT")[0]}</span>
      </div>
      <div className={Style.messageText}>{props.text}</div>
    </div>
  );
}
