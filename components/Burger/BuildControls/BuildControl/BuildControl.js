import React from "react";
import classes from "./BuildControl.module.css";

function BuildControl({ label, removeIng, addIng, disabled }) {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button className={classes.Less} disabled={disabled} onClick={removeIng}>
        Less
      </button>
      <button className={classes.More} onClick={addIng}>
        More
      </button>
    </div>
  );
}

export default BuildControl;
