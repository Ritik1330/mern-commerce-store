import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOuder: false,
  loading: false,
  error: null,
  order: {},
};

const orderDetailsslice = createSlice({
  name: "orderDetails",
  initialState,

  reducers: {
    //create order
    OrdersDetailsRequest: (state, action) => {
      state.loading = true;
    },
   
    OrdersDetailsSuccess: (state, action) => {
      state.loading = false;
      state.isOuder = true;
      state.order = action.payload.order;
      console.log("payload")
      console.log(action.payload.order)
    },

    OrdersDetailsFail(state, action) {
      state.loading = false;
      state.isOuder = true;
      state.error = action.payload;
    },

    clearEroors: (state, action) => {
      state.error = null;
    },
  },
});

export const { OrdersDetailsRequest, OrdersDetailsSuccess, OrdersDetailsFail, clearEroors } =
  orderDetailsslice.actions;
export default orderDetailsslice.reducer;
