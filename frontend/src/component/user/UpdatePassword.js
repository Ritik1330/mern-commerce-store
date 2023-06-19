import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import "./UpdatePassword.css";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';
import {
  loadUser,
  updatePassword,
  clearErrors,
} from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../layout/Aleart/Aleart";
import { updatePasswordReset } from "../../redux/reducers/profileUpdateSlice";
import MetaData from "../layout/Header/Metadata";

export default function UpdatePassword() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
  // const { user } = useSelector((state) => state.user);

  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState("");
  const [confirampassword, setConfirampassword] = useState("");
  const updatePasswordSubmit = (e) => {
    console.log("form submit");

    e.preventDefault();
    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("password", password);
    myForm.set("confirampassword", confirampassword);

    dispatch(updatePassword(myForm));
  };
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 5000);
    }

    if (isUpdated) {
      dispatch(loadUser());
      dispatch(updatePasswordReset());

    
        history("/account");
    }
  }, [history, error, dispatch, isUpdated,]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {error && <Alert message={error} />}
          <MetaData title="Update Profile" />
          <div className="loginSignUpContainer">
            <div className="loginSignUpBox">
              <h2>UPDATE PROFILE</h2>
              <form
                className="updateForm"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <div>
                  <KeyIcon />
                  <input
                    type="name"
                    placeholder="oldPassword"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="confirampassword"
                    required
                    value={confirampassword}
                    onChange={(e) => setConfirampassword(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Update"
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
