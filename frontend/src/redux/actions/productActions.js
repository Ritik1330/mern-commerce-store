import axios from "axios";

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../reducers/productSlice";

export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], Category,rating=0) =>
  async (dispatch) => {
    try {
      dispatch(ALL_PRODUCT_REQUEST());
      console.log("first");
      console.log(price);
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;
      if (Category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${Category}&ratings[gte]=${rating}`;
      }
      const { data } = await axios.get(link);
      dispatch(ALL_PRODUCT_SUCCESS(data));
    } catch (error) {
      // console.log(error);
      dispatch(ALL_PRODUCT_FAIL(error.response.data.message));
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERRORS());
};
