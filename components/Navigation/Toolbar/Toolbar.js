import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.module.css";

function Toolbar({ clicked }) {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.Menu} onClick={clicked}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Logo height="80%" />
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
}

export default Toolbar;
