import * as actiontypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  building: false,
};

const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontypes.SET_INGREDIENT:
      return {
        ...state,
        building: false,
        error: false,
        ingredients: action.ingredients,
        totalPrice: 0,
      };

    case actiontypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        building: false,
        error: true,
      };

    case actiontypes.ADD_INGREDIENT:
      const updatedingredients = updateObject(state.ingredients, {
        [action.ingredientType]: state.ingredients[action.ingredientType] + 1,
      });
      return {
        ...state,
        building: true,
        ingredients: updatedingredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
      };

    case actiontypes.REMOVE_INGREDIENT:
      return {
        ...state,
        building: true,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]:
            state.ingredients[action.ingredientType] >= 1
              ? state.ingredients[action.ingredientType] - 1
              : state.ingredients[action.ingredientType],
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
      };

    default:
      return state;
  }
};

export default burgerReducer;
