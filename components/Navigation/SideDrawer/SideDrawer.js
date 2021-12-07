import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import Backdrop from "../../UI/Backdrop/Backdrop";

function SideDrawer({ closeNav, show }) {
  return (
    <>
      <Backdrop show={show} closeModal={closeNav} />
      <div
        className={[
          classes.SideDrawer,
          show ? classes.Open : classes.Close,
        ].join(" ")}
      >
        <Logo height="11%" />
        <nav style={{ marginTop: "30px" }}>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
}

export default SideDrawer;
