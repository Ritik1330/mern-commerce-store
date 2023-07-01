import axios from "axios";

import {
  CLEAR_ERRORS,
  deleteproductRequest,
  deleteproductSuccess,
  deleteproductFail,
  updateproductRequest,
  updateproductSuccess,
  updateproductFail
} from "../reducers/productSlice";
import {
  newproductRequest,
  newproductSuccess,
  newproductFail,

} from "../reducers/newProductSlice";

//admin create product
export const createProduct = (myForm) => async (dispatch) => {
  try {
    dispatch(newproductRequest());
    console.log("c1");

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      "/api/v1/admin/product/new",
      myForm,
      config
    );
    dispatch(newproductSuccess(data));
  } catch (error) {
    dispatch(newproductFail(error.response.data.message));
  }
};
// update product ---admin

export const updateProduct = (id,myForm) => async (dispatch) => {
  try {
    dispatch(updateproductRequest());
    console.log("c1");

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      myForm,
      config
    );
    dispatch(updateproductSuccess(data));
  } catch (error) {
    dispatch(updateproductFail(error.response.data.message));
  }
};

// delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteproductRequest());
    console.log("c1");

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
    dispatch(deleteproductSuccess(data));
  } catch (error) {
    dispatch(deleteproductFail(error.response.data.message));
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERRORS());
};
