import axios from "axios";

import {
    myOrdersRequest,
    myOrdersSuccess,
    myOrdersFail,
  clearEroors,
} from "../reducers/myOrdersSlice";

// create order

export const myOrders = () => async (dispatch) => {
  try {
    dispatch(myOrdersRequest());

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get("/api/v1/orders/me", config);

    dispatch(myOrdersSuccess(data));
  } catch (error) {
    console.log(error.message);
    dispatch(myOrdersFail(error.response.data.message));
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(clearEroors());
};
