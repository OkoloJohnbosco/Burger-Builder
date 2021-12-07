import React, { useState } from "react";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";

function Layout(props) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div>
        <SideDrawer show={show} closeNav={() => setShow(false)} />
        <Toolbar clicked={() => setShow(true)} />
      </div>
      <main className={classes.Content}>{props.children}</main>
    </>
  );
}

export default Layout;
