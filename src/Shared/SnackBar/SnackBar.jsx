import React, { useEffect, useRef } from "react";
import Style from "./SnackBar.module.css";
export default function SnackBar(props) {
  const snackbarRef = useRef();
  useEffect(() => {
    console.log("hello");
    openSnackbar();
  }, [props.text]);
  const openSnackbar = () => {
    snackbarRef.current.classList.add(Style.show);
    setTimeout(function () {
      snackbarRef.current.classList.remove(Style.show);
    }, 3000);
  };

  return (
    <div className={Style.snackbar} ref={snackbarRef}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>X</div>
      <div>
        {props.sender} : {props.text}
      </div>
    </div>
  );
}
