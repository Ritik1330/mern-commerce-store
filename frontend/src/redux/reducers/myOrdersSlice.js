import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOuder: false,
  loading: false,
  error: null,
  orders: [],
};

const myOrdersslice = createSlice({
  name: "myOrders",
  initialState,

  reducers: {
    //create order
    myOrdersRequest: (state, action) => {
      state.loading = true;
    },
    myOrdersSuccess: (state, action) => {
      state.loading = false;
      state.isOuder = true;
      state.orders = action.payload.order;
    },

    myOrdersFail(state, action) {
      state.loading = false;
      state.isOuder = true;
      state.error = action.payload;
    },

    clearErrors: (state, action) => {
      state.error = null;
    },
  },
});

export const { myOrdersRequest, myOrdersSuccess, myOrdersFail, clearEroors } =
  myOrdersslice.actions;
export default myOrdersslice.reducer;
