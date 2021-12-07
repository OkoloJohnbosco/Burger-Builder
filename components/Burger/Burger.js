import React from "react";
import BurgerIngredient from "./BurgerIngrdient/BurgerIngredient";
import classes from "./Burger.module.css";

function Burger({ ingredients }) {
  let transformedIngredients = Object.keys(ingredients)
    .map((ingred) =>
      [...Array(ingredients[ingred])].map((_, i) => (
        <BurgerIngredient key={ingred + i} type={ingred} />
      ))
    )
    .reduce((el, newArr) => el.concat(newArr), []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Start add Ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}

      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default Burger;
