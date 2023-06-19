import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./reducers/productSlice";
import productDetailsSlice from "./reducers/productDetailsSlice";
import userSlice from "./reducers/userSlice";
import profileUpdateSlice from "./reducers/profileUpdateSlice";
import passwordSlice from "./reducers/passwordSlice";
import cartSlice from "./reducers/cartSlice";

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : JSON.parse(localStorage.getItem("cartItems")),
  },
};

export default configureStore({
  reducer: {
    products: productSlice,
    productDetails: productDetailsSlice,
    user: userSlice,
    profile: profileUpdateSlice,
    password: passwordSlice,
    cart: cartSlice,

    devTools: process.env.NODE_ENV !== "production",
    // prod:productSlice.reducer
  },
  initialState,
});
