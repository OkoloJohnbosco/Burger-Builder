import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

function Logo({ height }) {
  return (
    <div className={classes.Logo} style={{ height: height }}>
      <img src={burgerLogo} alt="myBurger" />
    </div>
  );
}

export default Logo;
