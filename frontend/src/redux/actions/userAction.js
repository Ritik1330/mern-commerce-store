import axios from "axios";

import {
  loginRequest,
  loginSuccess,
  loginFail,
  clearEroors,
  registerRequest,
  registerSuccess,
  registerFail,
  userDataRequest,
  userDataSuccess,
  userDataFail,
  logOutSuccess,
  logOutFail,
} from "../reducers/userSlice";
import {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  // updatePasswordReset,
  updatePasswordFail,
} from "../reducers/profileUpdateSlice";


// register user
export const register = (myForm) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post("/api/v1/register", myForm, config);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};


//login user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/login",
      {
        email,
        password,
      },
      config
    );
    dispatch(loginSuccess(data));
  } catch (error) {
    // console.log(error);
    dispatch(loginFail(error.response.data.message));
  }
};

// load user data
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(userDataRequest());

    const { data } = await axios.get("/api/v1/me");
    dispatch(userDataSuccess(data));
  } catch (error) {
    dispatch(userDataFail(error.response.data.message));
  }
};

// loguout user
export const logOut = () => async (dispatch) => {
  try {
    // dispatch(userDataRequest());

    const { data } = await axios.get("/api/v1/logout");
    dispatch(logOutSuccess(data));
  } catch (error) {
    dispatch(logOutFail(error.response.data.message));
  }
};

// update user profile

export const updateProfile = (myForm) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put("/api/v1/me/update", myForm, config);
    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(updateProfileFail(error.response?.data?.message));
  }
};

//password update
export const updatePassword = (myForm) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());

    const config = { headers: {  "Content-Type": "application/json"  } };
       const { data } = await axios.put("/api/v1/password/update", myForm, config);

    dispatch(updatePasswordSuccess(data));
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(clearEroors());
};
