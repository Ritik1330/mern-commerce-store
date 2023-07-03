import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOuder: false,
  loading: false,
  error: null,
  newOrder: {},
};

const neworderslice = createSlice({
  name: "newOrder",
  initialState,

  reducers: {
    //create order
    orderRequest: (state, action) => {
      state.loading = true;
    },
    orderSuccess: (state, action) => {
      state.loading = false;
      state.isOuder = true;
      state.newOrder = action.payload.order;
    },

    orderFail(state, action) {
      state.loading = false;
      state.isOuder = true;
      state.error = action.payload;
    },

    clearEroors: (state, action) => {
      state.error = null;
    },
  },
});

export const { orderRequest, orderSuccess, orderFail, clearEroors } =
  neworderslice.actions;
export default neworderslice.reducer;
