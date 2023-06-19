import React, { Fragment, useEffect,  useState } from "react";
import Loader from "../layout/Loader/Loader";
import "./UpdateProfile.css";
import {  useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import { loadUser,  updateProfile,clearErrors } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../layout/Aleart/Aleart";
import { updateProfileReset } from "../../redux/reducers/profileUpdateSlice";
import MetaData from "../layout/Header/Metadata";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function UpdateProfile() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [avatar, setavatar] = useState();
  const [avtarPreview, setavtarPreview] = useState("/profile.png");
  useEffect(() => {
   
      if (error) {
        toast(error)
       
          dispatch(clearErrors())
       
       }

      if (isUpdated) {
        
       
 
        dispatch(loadUser());
        dispatch( updateProfileReset() );

        if (user) {
          history("/account"); 
        }
         
      }
     
    
    },
    [history, error, dispatch, isUpdated, user]
  );

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setavatar(reader.result);
        setavtarPreview(reader.result);
        console.log("avatar");
        console.log(avatar)
   
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateProfileSubmit = (e) => {
    console.log("form submit");

    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ToastContainer />
          {/* {error && <Alert message={error} />} */}
          <MetaData title="Update Profile"/>
          <div className="loginSignUpContainer">
            <div className="loginSignUpBox">
              <h2>UPDATE PROFILE</h2>
              <form
                className="updateForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="signUpName">
                  <PersonIcon />
                  <input
                    name="name"
                    type="name"
                    placeholder="name"
            
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
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

                <div className="updateProfileImage" id="updateProfileImage">
                  <img src={avtarPreview} alt="avtarPreview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
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
