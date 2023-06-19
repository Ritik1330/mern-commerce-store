import { useEffect } from "react";
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



function App() {
  const dispatch = useDispatch();
  const { isAuthecated, loading } = useSelector((state) => state.user);

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

        {loading === false && (
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        )}
        {!loading && (
          <Route
            path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
        )}
        {!loading && (
          <Route
            path="password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
        )}
        {!loading && (
          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
        )}
        {!loading && (
          <Route
            path="/process/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
        )}
      </Routes>

      <Footer></Footer>
    </Router>
  );
}

export default App;
