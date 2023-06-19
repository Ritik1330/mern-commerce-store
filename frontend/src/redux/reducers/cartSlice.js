import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
   shippingInfo: localStorage.getItem("shippingInfo")
   ? JSON.parse(localStorage.getItem("shippingInfo"))
   : {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      let item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.productId === item.productId
      );
      if (isItemExist) {
        console.log("ifcalled");
        state.cartItems = state.cartItems.map((i) =>
          i.productId === isItemExist.productId ? item : i
        );
      } else {
        state.cartItems.push(item);
      }
    },
    removeToCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
    },

    saveShippingInfo: (state, action) => {
      // let item = action.payload;
      state.shippingInfo=action.payload
     
    },
  },
});

export const { addToCart, removeToCart,saveShippingInfo } = cartSlice.actions;
export default cartSlice.reducer;
