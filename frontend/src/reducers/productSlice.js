import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productsCounts: 0,
  loading: Boolean,
  error: undefined,
};

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    ALL_PRODUCT_REQUEST: (state, action) => {
      state.loading = true;
      state.products = [];
    },
    ALL_PRODUCT_SUCCESS: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCounts = action.payload.productcount;
  

    },

    ALL_PRODUCT_FAIL(state, action) {
// console.log(action. payload)
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERRORS: (state, action) => {
      // ...state
      state.error = null;
    },
  },
});

export const {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
} = productSlice.actions;
export default  productSlice.reducer;

