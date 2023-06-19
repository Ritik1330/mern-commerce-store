import axios from "axios";
import { addToCart,removeToCart,saveShippingInfo } from "../reducers/cartSlice";

//add item to cart
export const addToCartitem = (id, quantity) => async (dispatch, getstate) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.get(`/api/v1/product/${id}`, config);
  let paylod = {
    productId: data.product._id,
    name: data.product.name,
    price: data.product.price,
    image: data.product.images[0].url,
    stock: data.product.stock,
    quantity: quantity,
  };
  // console.log("action")
  // console.log()
  dispatch(addToCart(paylod));
  localStorage.setItem("cartItems", JSON.stringify(getstate().cart.cartItems));
};
//remove forn cart
export const removeItemsFromCart = (id) => async (dispatch, getstate) => {
  dispatch(removeToCart(id));
  localStorage.setItem("cartItems", JSON.stringify(getstate().cart.cartItems));
};
export const saveShippingInfoAction = (data) => async (dispatch, getstate) => {
  dispatch(saveShippingInfo(data));
  localStorage.setItem("shippingInfo", JSON.stringify(getstate().cart.shippingInfo));
};
