import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/Header/Metadata";
import { Link, useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import SideBar from "./Sidebar";
import { clearErrors, updateOrder } from "../../redux/actions/orderAction";
import { getOrderDetails ,clearErrors as clearErrors11} from "../../redux/actions/orderDetailsAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button } from "@mui/material";
// import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { updateorderResete } from "../../redux/reducers/orderslice";

const ProcessOrder = () => {
  const history = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(params.id, myForm));
  };

  useEffect(() => {
    if (error!==null) {
      toast.error(error);
      dispatch(clearErrors11());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    // console.log(status)
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch(updateorderResete());
    }

    dispatch(getOrderDetails(params.id));
    console.log(order);
  }, [dispatch, toast, error, params.id,
     isUpdated,
      updateError
    ]);

  return (
    <Fragment>
      <ToastContainer />
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
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
                      <span>{order.totalPrise && order.totalPrise}</span>{" "}
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
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
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
