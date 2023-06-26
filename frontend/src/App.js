import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import WebFont from "webfontloader";
import { Routes, Route } from "react-router-dom";
import Test from "./component/Test";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/home/Home.js";
import Products from "./component/Products/Products.js";
import ProductDetails from "./component/product/ProductDetails.js";
import Search from "./component/product/Search.js";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userAction";
import UserOption from "./component/layout/UserOption.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import LoginSignUp from "./component/user/LoginSignUp.js";
import Profile from "./component/user/Profile.js";
import UpdateProfile from "./component/user/UpdateProfile.js";
import UpdatePassword from "./component/user/UpdatePassword.js";
import ForgetPassword from "./component/user/ForgetPassword";
import ResetPassword from "./component/user/ResetPassword";
import Cart from "./component/cart/Cart.js";
import Shipping from "./component/cart/Shipping";
import ConfirmOrder from "./component/cart/ConfirmOrder";
import Payment from "./component/cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/cart/OrderSuccess";
import MyOrder from "./component/order/MyOrder";
import OrderDetails from "./component/order/OrderDetails";

function App() {
  const dispatch = useDispatch();
  const { isAuthecated, loading } = useSelector((state) => state.user);
  const [stripeapikey, setstripeapikey] = useState();
  async function getStripeapiKet() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setstripeapikey(data.stripeapikey7);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Droid Serif"],
      },
    });
    console.log("app");
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Header></Header>
      {isAuthecated && <UserOption />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/test" element={<Test />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/password/forget" element={<ForgetPassword />} />
        <Route path="/password/reset" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />

        <Route path="/order/confirm" element={<ConfirmOrder />} />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/process/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/OrderSuccess"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              {" "}
              <MyOrder />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer></Footer>
    </Router>
  );
}

export default App;
