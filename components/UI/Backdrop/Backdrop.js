import React from "react";
import classes from "./Backdrop.module.css";

function Backdrop({ show, closeModal }) {
  return (
    <>{show && <div className={classes.Backdrop} onClick={closeModal}></div>}</>
  );
}

export default Backdrop;
