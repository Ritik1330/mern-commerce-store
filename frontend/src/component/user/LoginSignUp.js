import React, { Fragment, useEffect, useRef, useState } from "react";
import Loader from "../layout/Loader/Loader";
import "./loginSignUp.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import {
  login,
  clearErrors,
  register,
  loadUser,
} from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../layout/Aleart/Aleart";
import { ToastContainer, toast } from "react-toastify";

// import Loader from '../layout/Loader/Loader.js'

export default function LoginSignUp() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation()

  const { error, loading, isAuthecated } = useSelector((state) => state.user);
  // const clearErrors =clearErrors()

  const switcherTab = useRef(null);
  const loginTab = useRef(null);
  const registerTab = useRef(null);

  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");

  let [user, setuser] = useState({
    name: "12",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setavatar] = useState();
  const [avtarPreview, setavtarPreview] = useState("/profile.png");

  useEffect(
    (error) => {
      if (error !== null) {
        setTimeout(() => {
          dispatch(clearErrors());
        }, 5000);
      }

      // if (!isAuthecated) {
      //   dispatch(loadUser());
      // }
      if (isAuthecated) {
        history(location.search?location.search.split("=")[1]:"/account");
      }
    },
    [isAuthecated, history, error, dispatch]
  );

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatar(reader.result);
          setavtarPreview(reader.result);
          // console.log(reader.result);
          // console.log(e.target.files[0])
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setuser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    console.log("loginsubmit");
  };

  const registerSubmit = (e) => {
    console.log("form submit");

    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
    // console.log(myForm.get())
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("movelogin");
    }
    if (tab === "register") {
      switcherTab.current.classList.remove("shiftToNeutral");
      switcherTab.current.classList.add("shiftToRight");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("movelogin");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {error && <Alert message={error} />}

          <div className="loginSignUpContainer">
            <div className="loginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}> LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}> REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setloginEmail(e.target.value)}
                  />
                </div>
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setloginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forget"> forget Password</Link>
                <input type="submit" value="login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <PersonIcon />
                  <input
                    name="name"
                    type="name"
                    placeholder="name"
                    required
                    value={user.name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    required
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    name="password"
                    placeholder="pass"
                    required
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="registerImage" id="registerImage">
                  <img src={avtarPreview} alt="avtarPreview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="submit"
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
