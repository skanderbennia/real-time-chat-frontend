import React from "react";
import Style from "./Button.module.css";
export default function Button({ onClick }) {
  return (
    <div className={Style.button} onClick={onClick}>
      <span>Join</span>
    </div>
  );
}
