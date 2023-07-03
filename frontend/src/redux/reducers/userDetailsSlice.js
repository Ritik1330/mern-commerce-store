import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuthecated: false,
  loading: false,
  error: null,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,

  reducers: {
    // load user data
    adminuserDataRequest: (state, action) => {
      // console.log("sl");
      state.loading = true;
    },
    adminuserDataSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    },

    adminuserDataFail(state, action) {
      state.loading = false;

      state.user = null;
      state.error = action.payload;
    },

    clearEroors: (state, action) => {
      state.error = null;
    },
  },
});

export const { adminuserDataRequest, adminuserDataSuccess, adminuserDataFail } =
  userDetailsSlice.actions;
export default userDetailsSlice.reducer;
