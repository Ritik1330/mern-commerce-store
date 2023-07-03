import axios from "axios";

import {
  orderRequest,
  orderSuccess,
  orderFail,
  clearEroors,
} from "../reducers/neworderslice";
import {
  adminAllOrdersRequest,
  adminAllOrdersSuccess,
  adminAllOrdersFail,
  CLEAR_ERRORS,
} from "../reducers/allorderSlice";
import {
  deleteorderRequest,
  deleteorderSuccess,
  deleteorderFail,
  updateorderRequest,
  updateorderSuccess,
  updateorderFail,
  // clearEroors,
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
//admin delete order

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteorderRequest());

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    dispatch(deleteorderSuccess(data));
  } catch (error) {
    console.log(error.message);
    dispatch(deleteorderFail(error.response.data.message));
  }
};
//admin update order

export const updateOrder = (id,myForm) => async (dispatch) => {
  try {
    dispatch(updateorderRequest());
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(`/api/v1/admin/order/${id}`,myForm,config);

    dispatch(updateorderSuccess(data));
  } catch (error) {
    console.log(error.message);
    dispatch(updateorderFail(error.response.data.message));
  }
};
