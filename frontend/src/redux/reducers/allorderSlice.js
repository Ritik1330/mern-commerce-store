import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],

};

const allorderSlice = createSlice({
  name: "allOrders",
  initialState,

  reducers: {
    
    //admin allorder request
    adminAllOrdersRequest: (state, action) => {
      state.loading = true;
      state.products = [];
    },
    adminAllOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
    },

    adminAllOrdersFail(state, action) {
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
    adminAllOrdersRequest,
    adminAllOrdersSuccess,
    adminAllOrdersFail,
    CLEAR_ERRORS
} = allorderSlice.actions;
export default  allorderSlice.reducer;

