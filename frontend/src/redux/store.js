import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./reducers/productSlice";
import productDetailsSlice from "./reducers/productDetailsSlice";
import userSlice from "./reducers/userSlice";
import profileUpdateSlice from "./reducers/profileUpdateSlice";
import passwordSlice from "./reducers/passwordSlice";
import cartSlice from "./reducers/cartSlice";
import orderslice from "./reducers/orderslice";
import myOrderslice from "./reducers/myOrdersSlice";
import orderDetailsslice from "./reducers/orderDetailsslice";
import reviewSlice from "./reducers/reviewSlice";

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : JSON.parse(localStorage.getItem("cartItems")),
  },
};

export default configureStore({
  reducer: {
    devTools: process.env.NODE_ENV !== "production",
    products: productSlice,
    productDetails: productDetailsSlice,
    user: userSlice,
    profile: profileUpdateSlice,
    password: passwordSlice,
    cart: cartSlice,
    newOrder: orderslice,
    myOrders:myOrderslice,
    orderDetails:orderDetailsslice,
    newReview: reviewSlice,
    // prod:productSlice.reducer
  },
  initialState,
});
