import React from "react";
import classes from "./Order.module.css";

function Order({ ingredients, price }) {
  let ingred = Object.keys(ingredients).map((i) => (
    <span key={i}>
      {i}: <strong>{ingredients[i]} </strong>
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingred}</p>
      <p>
        Price: <strong>USD {price}</strong>
      </p>
    </div>
  );
}

export default Order;
