import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
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
import OrderSuccess from "./component/cart/OrderSuccess";
import MyOrder from "./component/order/MyOrder";
import OrderDetails from "./component/order/OrderDetails";
//admin screen
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersLis.js";
import UpdateUser from "./component/Admin/UpdateUser.js";

// import ProductReviews from "./component/Admin/ProductReviews";
// import Contact from "./component/layout/Contact/Contact";
// import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound.js";
import NewProduct from "./component/Admin/NewProduct.js";

function App() {
  const dispatch = useDispatch();
  const { isAuthecated, loading } = useSelector((state) => state.user);
  // const [stripeapikey, setstripeapikey] = useState();
  // async function getStripeapiKet() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setstripeapikey(data.stripeapikey7);
  // }

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
        {/* <Route path='*' element={<NotFound />} /> */}
      <Header></Header>
      {isAuthecated && <UserOption />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/password/forget" element={<ForgetPassword />} />
        <Route path="/password/reset" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />

        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />

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
              <MyOrder />
            </ProtectedRoute>
          }
        />
        {/* admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <OrderList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/404" element={<NotFound />} /> */}
       
      </Routes>

      <Footer></Footer>
    </Router>
  );
}

export default App;
