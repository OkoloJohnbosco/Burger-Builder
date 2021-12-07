import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredients = (ingredientType) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientType,
});

export const removeIngredients = (ingredientType) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientType,
});

export const setIngredients = (ingredients) => ({
  type: actionTypes.SET_INGREDIENT,
  ingredients,
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const asyncGetIngredients = () => (dispatch) => {
  axios
    .get("/ingredients.json")
    .then((res) => {
      console.log(res);
      dispatch(setIngredients(res.data));
    })
    .catch((err) => {
      console.error(err);
      dispatch(fetchIngredientsFailed());
    });
};
