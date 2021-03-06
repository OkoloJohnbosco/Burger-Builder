import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

function NavigationItem({ link, children, exact }) {
  return (
    <li className={classes.NavigationItem}>
      <NavLink to={link} exact={exact} activeClassName={classes.active}>
        {children}
      </NavLink>
    </li>
  );
}

export default NavigationItem;
