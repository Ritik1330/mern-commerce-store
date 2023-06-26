import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MetaData from "../layout/Header/Metadata";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  getOrderDetails,
  clearErrors,
} from "../../redux/actions/orderDetailsAction";
import Loader from "../layout/Loader/Loader";
import { myOrders } from "../../redux/actions/myOrderAction";


const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const params = useParams();
  // dispatch(getOrderDetails());
  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, , error, params.id]);


  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>




                  <p>  {order.pymentInfo &&
                    order.paymentInfo}</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.pymentInfo &&
                      order.pymentInfo.status === "success"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.pymentInfo &&
                    order.pymentInfo.status === "success"
                      ? "PAID"
                      : "NOT PAID"}
                    
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrise && order.totalPrise}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.ordetStatus && order.ordetStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.ordetStatus && order.ordetStatus}

                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.productId}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.productId}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
