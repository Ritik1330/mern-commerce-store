import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // product: {},
  loading: false,
  error: undefined,
  isDeleted: false,
  isUpdated: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    //admin delete product
    deleteproductRequest: (state, action) => {
      state.loading = true;
    },
    deleteproductSuccess: (state, action) => {
      state.loading = false;
      // state.product = action.payload;
      state.isDeleted = action.payload.success;
    },

    deleteproductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductReset(state, action) {
      state.loading = false;
      state.isDeleted = false;
    },
    // update product admin
    updateproductRequest: (state, action) => {
      state.loading = true;
    },
    updateproductSuccess: (state, action) => {
      state.loading = false;
      // state.product = action.payload;
      state.isUpdated = action.payload.success;
    },

    updateproductFail(state, action) {
      state.loading = false;
      state.updateError = action.payload;
    },
    updateProductReset(state, action) {
      state.loading = false;
      state.isUpdated = false;
    },

    CLEAR_ERRORS: (state, action) => {
      // ...state
      state.error = null;
    },
  },
});

export const {
  CLEAR_ERRORS,
  deleteProductReset,
  deleteproductFail,
  deleteproductRequest,
  deleteproductSuccess,
  updateProductReset,
  updateproductFail,
  updateproductRequest,
  updateproductSuccess,
} = productSlice.actions;

export default productSlice.reducer;
