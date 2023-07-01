import axios from "axios";

import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../reducers/productDetailSlice";
import {} from "../reducers/newProductSlice";

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(PRODUCT_DETAILS_REQUEST());

    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch(PRODUCT_DETAILS_SUCCESS(data.product));
  } catch (error) {
    // dispatch(PRODUCT_DETAILS_FAIL(error));
    dispatch(PRODUCT_DETAILS_FAIL(error.response.data.message));
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERRORS());
};
