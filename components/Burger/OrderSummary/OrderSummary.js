import React from "react";
import Button from "../../UI/Button/Button";

function OrderSummary({ ingredients, closeModal, purchase, price }) {
  const ingredientSummary = Object.keys(ingredients).map((item) => (
    <li key={item} style={{ marginBottom: "20px" }}>
      <span style={{ textTransform: "capitalize" }}>{item}</span>:{" "}
      {ingredients[item]}
    </li>
  ));
  return (
    <>
      <h3>Your Order</h3>
      <p>A Delicious burger with the following ingredients: </p>
      <ul>{ingredientSummary}</ul>
      <p>
        Total Price: <strong>${price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={closeModal}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={purchase}>
        CONTINUE
      </Button>
    </>
  );
}

export default OrderSummary;
