import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./reducers/productsSlice";
import productSlice from "./reducers/productSlice";
import productDetailSlice from "./reducers/productDetailSlice";
import userSlice from "./reducers/userSlice";
import profileUpdateSlice from "./reducers/profileUpdateSlice";
import passwordSlice from "./reducers/passwordSlice";
import cartSlice from "./reducers/cartSlice";
import orderslice from "./reducers/orderslice";
import myOrderslice from "./reducers/myOrdersSlice";
import orderDetailsslice from "./reducers/orderDetailsslice";
import reviewSlice from "./reducers/reviewSlice";
import allUsersSlice from "./reducers/allUsersSlice";
import allorderSlice from "./reducers/allorderSlice.js";
import newProductSlice from "./reducers/newProductSlice.js";

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
    products: productsSlice,
    productDetails: productDetailSlice,
    product: productSlice,
    user: userSlice,
    profile: profileUpdateSlice,
    password: passwordSlice,
    cart: cartSlice,
    newOrder: orderslice,
    myOrders: myOrderslice,
    orderDetails: orderDetailsslice,
    newReview: reviewSlice,
    allUsers: allUsersSlice,
    allOrders: allorderSlice,
    newProduct: newProductSlice,

    // order: orderReducer,
    // allUsers: allUsersReducer,
    // userDetails: userDetailsReducer,
    // productReviews: productReviewsReducer,
    // review: reviewReducer,

    // order: orderReducer,
    // prod:productSlice.reducer
  },
  initialState,
});
