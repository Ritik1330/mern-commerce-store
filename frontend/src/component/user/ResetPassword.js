import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import "./UpdateProfile.css";
import {useLocation, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { loadUser, clearErrors } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/actions/passwordAction";
import MetaData from "../layout/Header/Metadata";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
//   console.log('location', location.state.email)
  const { loading, message, otpsend,pssswordupdate } = useSelector((state) => state.password);
  const { user } = useSelector((state) => state.user);

//   const [email, setEmail] = useState("");
  const [otp, setOtp] = useState();
  const [password, setPassword] = useState("");
  const [confirampassword, setConfirampassword] = useState("");
  const updateProfileSubmit = (e) => {
    console.log("form submit");

    e.preventDefault();
    const myForm = new FormData();

    myForm.set("email", location.state.email);
    myForm.set("otp", otp);
    myForm.set("password", password);
    myForm.set("confirampassword", confirampassword);

    dispatch(resetPassword(myForm));
  };
  useEffect(() => {
   console.log("useefect")
    if (message) {
      toast(message);

      dispatch(clearErrors());
    }

    if (pssswordupdate) {
        dispatch(loadUser())
        
      history("/account");
    }
  }, [history, message, dispatch,pssswordupdate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ToastContainer />
          <MetaData title="resetpassword Password" />
          <div className="loginSignUpContainer">
            <div className="loginSignUpBox">
              <h2>Reset Password</h2>
              <form
                className="updateForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="number"
                    name="otp"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="password"
                    name="confirampassword"
                    placeholder="confirampassword"
                    value={confirampassword}
                    onChange={(e) => setConfirampassword(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="OTP"
                  className="signUpBtn"
                  //    disabled={loding? true  : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
