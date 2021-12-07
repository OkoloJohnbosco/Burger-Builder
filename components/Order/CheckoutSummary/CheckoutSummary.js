import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

function CheckoutSummary({ ingredients, checkoutCancel, checkoutContinue }) {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it taste Well </h1>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Burger ingredients={ingredients} />
      </div>
      <Button clicked={checkoutCancel} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={checkoutContinue} btnType="Success">
        CONTINUE
      </Button>
    </div>
  );
}

export default CheckoutSummary;
