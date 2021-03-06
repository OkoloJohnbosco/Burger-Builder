import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  orders: [],
  purchased: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: [...state.orders, {...action.orderData, id: action.orderId}],
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FECTCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: [...action.orders],
        loading: false,
      };

    case actionTypes.FECTCH_ORDERS_FAIL:
      console.log('FECTCH_ORDERS_Failed');
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default orderReducer;
