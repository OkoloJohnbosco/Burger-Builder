import React from "react";
import classes from "./Button.module.css";

function Button({ children, clicked, btnType, disabled, type = "button" }) {
  return (
    <button
      className={[classes.Button, classes[btnType]].join(" ")}
      onClick={clicked}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
