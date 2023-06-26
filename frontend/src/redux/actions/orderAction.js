import axios from "axios";

import {
  orderRequest,
  orderSuccess,
  orderFail,
  clearEroors,
} from "../reducers/orderslice";

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
