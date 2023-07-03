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
  updateProfileReset,
  updateProfileFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordReset,
  updatePasswordFail,
  admindeleteUserRequest,
  admindeleteUserSuccess,
  admindeleteUserFail,
  admindeleteUserResete,
  clearEroors as clearEroorsprofile,
  adminupdateUserRequest,
  adminupdateUserSuccess,
  adminupdateUserFail,
  adminupdateUserResete,
} from "../reducers/profileUpdateSlice";
//admin access
import {
  adminallUsersRequest,
  adminallUsersSuccess,
  adminallUsersFail,
  CLEAR_ERRORS,
} from "../reducers/allUsersSlice";
import {
  adminuserDataRequest,
  adminuserDataSuccess,
  adminuserDataFail,
} from "../reducers/userDetailsSlice";
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

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put("/api/v1/password/update", myForm, config);

    dispatch(updatePasswordSuccess(data));
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(clearEroors());
  dispatch(clearEroorsprofile());
};

//get all user admin
// load user data
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(adminallUsersRequest());

    const { data } = await axios.get("/api/v1/admin/users");
    dispatch(adminallUsersSuccess(data));
  } catch (error) {
    dispatch(adminallUsersFail(error.response.data.message));
  }
};
//deleteuser admin

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(admindeleteUserRequest());

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
    dispatch(admindeleteUserSuccess(data));
  } catch (error) {
    dispatch(admindeleteUserFail(error.response.data.message));
  }
};
//updateUser admin

export const updateUser = (id,myForm) => async (dispatch) => {
  try {
    dispatch(adminupdateUserRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/v1/admin/user/${id}`,myForm,config);
    dispatch(adminupdateUserSuccess(data));
  } catch (error) {
    dispatch(adminupdateUserFail(error.response.data.message));
  }
};

//user details admin
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch(adminuserDataRequest());

    const { data } = await axios.get(`/api/v1/admin/user/${id}`);
    dispatch(adminuserDataSuccess(data));
  } catch (error) {
    dispatch(adminuserDataFail(error.response.data.message));
  }
};
