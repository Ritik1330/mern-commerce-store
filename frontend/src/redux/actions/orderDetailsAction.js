import axios from "axios";

import orderDetailsslice, {
    OrdersDetailsRequest, OrdersDetailsSuccess, OrdersDetailsFail, clearEroors

} from "../reducers/orderDetailsslice";

// create order

export const getOrderDetails = (id) => async (dispatch) => {
  console.log("orderDetailsslice")
  try {
    dispatch(OrdersDetailsRequest());
    console.log("orderDetailsslice")
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get(`/api/v1/order/${id}`, config);

    dispatch(OrdersDetailsSuccess(data));
  } catch (error) {
    // console.log(error.message);
    dispatch(OrdersDetailsFail(error.response.data.message));
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(clearEroors());
};
