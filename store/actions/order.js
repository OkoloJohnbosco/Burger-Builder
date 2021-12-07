import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData: orderData,
});

const purchaseBurgerFail = (error) => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error: error,
});

const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData, token) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axios
    .post(`/orders.json?auth=${token}`, orderData)
    .then((res) => {
      console.log(res.data);
      dispatch(purchaseBurgerSuccess(res.data.name, orderData));
    })
    .catch((err) => dispatch(purchaseBurgerFail(err)));
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FECTCH_ORDERS_SUCCESS,
  orders: orders,
});

export const fetchOrdersFail = (error) => ({
  type: actionTypes.FECTCH_ORDERS_FAIL,
  error: error,
});

export const fetchOrders = (token) => (dispatch) => {
  dispatch(fetchOrdersStart());
  axios
    .get(`/orders.json?auth=${token}`)
    .then((res) => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({ ...res.data[key], id: key });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch((err) => {
      console.error(err);
      console.error("You Failed??");
      dispatch(fetchOrdersFail(err));
    });
};
