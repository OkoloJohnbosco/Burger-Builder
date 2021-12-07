import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

function BuildControls({
  addIng,
  removeIng,
  disabled,
  price,
  ordered,
  isAuth,
}) {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>${price.toFixed(2)}</strong>
      </p>
      {controls.map((ctr) => (
        <BuildControl
          label={ctr.type}
          key={ctr.type}
          addIng={() => addIng(ctr.type)}
          removeIng={() => removeIng(ctr.type)}
          disabled={disabled[ctr.type]}
        />
      ))}
      <button
        onClick={ordered}
        className={classes.OrderButton}
        disabled={price <= 0}
      >
        {isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
      </button>
    </div>
  );
}

export default BuildControls;
