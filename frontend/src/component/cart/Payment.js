import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Header/Metadata";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import useRazorpay from "react-razorpay";

import logo from "../../images/logo1.png";
import axios from "axios";
import "./payment.css";

import { useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/actions/orderAction";
// import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = () => {
  const history = useNavigate();
  const Razorpay = useRazorpay();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();

  const payBtn = useRef(true);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  // const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrise: orderInfo.subtotal,
    texPrise: orderInfo.tax,
    shippingPrise: orderInfo.shippingCharges,
    totalPrise: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/payment/process",
      paymentData,
      config
    );
    console.log(data.order.amount);
    // console.log(data)
    // const order = await createOrder(params); //  Create order on your backend

    const options = {
      key: "rzp_test_hfSumcQYoN8tqo", // Enter the Key ID generated from the Dashboard
      amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "My Ecommerce",
      description: "by this product ",
      image: logo,
      order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response) {
        order.pymentInfo = {
          id: response.razorpay_payment_id,
          status: "success",
        };
        dispatch(createOrder(order))
        toast("Payment succes");
        
        history("/OrderSuccess")
        // console.log(response);
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#FF6347",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      toast("Payment faild");

      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }
  }, [alert]);

  return (
    <Fragment>
      <ToastContainer />
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>PAY NOW</Typography>
         

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
