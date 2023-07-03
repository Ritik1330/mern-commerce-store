import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./reducers/productsSlice";
import productSlice from "./reducers/productSlice";
import productDetailSlice from "./reducers/productDetailSlice";
import userSlice from "./reducers/userSlice";
import profileUpdateSlice from "./reducers/profileUpdateSlice";
import passwordSlice from "./reducers/passwordSlice";
import cartSlice from "./reducers/cartSlice";
import neworderslice from "./reducers/neworderslice";
import myOrderslice from "./reducers/myOrdersSlice";
import orderDetailsslice from "./reducers/orderDetailsslice";
import reviewSlice from "./reducers/reviewSlice";
import allUsersSlice from "./reducers/allUsersSlice";
import allorderSlice from "./reducers/allorderSlice.js";
import newProductSlice from "./reducers/newProductSlice.js";
import orderslice from "./reducers/orderslice.js";
import userDetailsSlice from "./reducers/userDetailsSlice.js";
// import profileSlice from "./reducers/profileSlice.js";

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
    newOrder: neworderslice,
    myOrders: myOrderslice,
    orderDetails: orderDetailsslice,
    newReview: reviewSlice,
    allUsers: allUsersSlice,
    allOrders: allorderSlice,
    newProduct: newProductSlice,
    // profile: profileSlice,

    order: orderslice,
    // allUsers: allUsersReducer,
    userDetails: userDetailsSlice,
    // productReviews: productReviewsReducer,
    // review: reviewReducer,

    // order: orderReducer,
    // prod:productSlice.reducer
  },
  initialState,
});
