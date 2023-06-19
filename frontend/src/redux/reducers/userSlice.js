import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuthecated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    //login
    loginRequest: (state, action) => {
      state.loading = true;
      state.user = [];
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthecated = true;
    },

    loginFail(state, action) {
      state.loading = false;
      state.user = null;
      state.isAuthecated = false;
      state.error = action.payload;
    },

    // forragister
    registerRequest: (state, action) => {
      state.loading = true;
      state.user = [];
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthecated = true;
    },

    registerFail(state, action) {
      state.loading = false;
      state.isAuthecated = false;
      state.user = null;
      state.error = action.payload;
    },
    // log out user
    logOutSuccess: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthecated = false;
    },

    logOutFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // load user data
    userDataRequest: (state, action) => {
      // console.log("sl");
      state.loading = true;
      state.isAuthecated = false;
      state.user = [];
    },
    userDataSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      // state.error = action.payload.message;
      state.isAuthecated = true;
      console.log("slice");
    },

    userDataFail(state, action) {
      state.loading = false;
      state.isAuthecated = false;
      state.user = null;
      state.error = action.payload;
    },
  

    clearEroors: (state, action) => {
      state.error = null;
    },
  },
});

export const {
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
} = userSlice.actions;
export default userSlice.reducer;
