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
    dispatch(logOutSuccess());
  } catch (error) {
    dispatch(logOutFail(error.response.data.message));
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(clearEroors());
};
