import axios from "axios";

import {
  orderRequest,
  orderSuccess,
  orderFail,
  clearEroors,
} from "../reducers/orderslice";
import {
  adminAllOrdersRequest,
  adminAllOrdersSuccess,
  adminAllOrdersFail,
  CLEAR_ERRORS
} from "../reducers/allorderSlice";

// create order

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(orderRequest());

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/v1/order/new", order, config);

    dispatch(orderSuccess(data));
  } catch (error) {
    console.log(error.message);
    dispatch(orderFail(error.response.data.message));
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(clearEroors());
};

//admin gate all order

export const getAllOrders = (order) => async (dispatch) => {
  try {
    dispatch(adminAllOrdersRequest());

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get("/api/v1/admin/orders", order, config);

    dispatch(adminAllOrdersSuccess(data));
  } catch (error) {
    console.log(error.message);
    dispatch(adminAllOrdersFail(error.response.data.message));
  }
};