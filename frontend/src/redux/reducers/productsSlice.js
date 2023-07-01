import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productsCounts: 0,
  resultperpage: 0,
  filterdProductCount: 0,
  loading: true,
  error: undefined,
};

const productsSlice = createSlice({
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
      state.resultperpage = action.payload.resultperpage;

      state.filterdProductCount = action.payload.filterdProductCount;
    },

    ALL_PRODUCT_FAIL(state, action) {
      // console.log(action. payload)
      state.loading = false;
      state.error = action.payload;
    },
    //admin products request
    adminProductRequest: (state, action) => {
      state.loading = true;
      state.products = [];
    },
    adminProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;

    },

    adminProductFail(state, action) {
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
  adminProductRequest,
  adminProductSuccess,
  adminProductFail,
} = productsSlice.actions;
export default productsSlice.reducer;
