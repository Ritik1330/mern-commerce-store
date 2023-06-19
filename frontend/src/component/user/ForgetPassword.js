import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  forgetPassword,
  clearErrors,
} from "../../redux/actions/passwordAction";
import MetaData from "../layout/Header/Metadata";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { loading, message, otpsend } = useSelector((state) => state.password);

  const [email, setEmail] = useState("");
  const updateProfileSubmit = (e) => {
    console.log("form submit");

    e.preventDefault();
    const myForm = new FormData();

    myForm.set("email", email);

    dispatch(forgetPassword(myForm));
  };
  useEffect(() => {
    if (message) {
      toast(message);

      dispatch(clearErrors());
    }

    if (otpsend) {
      history("/password/reset", {
        state: {
          email:email
        },
      });
    }
  }, [history, message, dispatch, otpsend]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ToastContainer />
          <MetaData title="forget Password" />
          <div className="loginSignUpContainer">
            <div className="loginSignUpBox">
              <h2>forget Password</h2>
              <form
                className="updateForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
