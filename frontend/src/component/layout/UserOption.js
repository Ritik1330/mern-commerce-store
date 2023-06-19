import React, { Fragment, useState } from "react";
import "./UserOption.css";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ExitToApp from "@mui/icons-material/ExitToApp";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { logOut } from "../../redux/actions/userAction";
import Backdrop from "@mui/material/Backdrop";

export default function UserOption() {
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  let history = useNavigate();
  let dispatch = useDispatch();
  const [logout, setlogout] = useState(false);
  const [open, setOpen] = useState(false);

  const actions = [
    { icon: <ListAltIcon />, name: "orders", fun: orders },
    { icon: <AccountCircleIcon />, name: "Profilet", fun: account },
    { icon: <ShoppingCartIcon style={{color:cartItems.length>0?"tomato":"unset"}} />, name: `cart(${cartItems.length})`, fun: gotocart  },
    { icon: <ExitToApp />, name: "Logout", fun: logoutUser },

  ];
  if (user.role === "admin") {
    actions.unshift({
      icon: <DashboardIcon />,
      name: "Dashbord",
      fun: dashbord,
    });
  }
  function dashbord() {
    history("./dashbord");
  }
  function gotocart() {
    history("./cart");
  }
  function orders() {
    history("/orders");
  }
  function account() {
    history("./account");
  }
  function logoutUser() {
    setlogout(true);
    dispatch(logOut());
    dispatch(logOut());
    console.log("logout calld");
    setTimeout(() => {
      setlogout(false);
      console.log("settime");
    }, 5000);
  }

  return (
    <Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => 10 }}
        open={open}
        // onClick={handleClose}
      ></Backdrop>
      {logout && (
        <div className="aleart">
          {" "}
          <Alert severity="success">Logout Succesfully</Alert>
        </div>
      )}

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", top: 16, right: 16 }}
        direction={"down"}
        style={{ zIndex: 11 }}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        icon={
          <img
            src={user.avatar.url ? user.avatar.url : "./profile.png"}
            alt="not found"
            className="speedDialIcon"
          />
        }
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.fun}
            tooltipOpen ={window.innerWidth<600 ?true:false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
}
