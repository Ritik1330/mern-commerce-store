import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],

};

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,

  reducers: {
 
    //admin products request
    adminallUsersRequest: (state, action) => {
      state.loading = true;
      state.products = [];
    },
    adminallUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
    },

    adminallUsersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERRORS: (state, action) => {
      // ...state
      state.error = null;
    },
  },
});

export const {
    adminallUsersRequest,
    adminallUsersSuccess,
    adminallUsersFail,
    CLEAR_ERRORS
} = allUsersSlice.actions;
export default  allUsersSlice.reducer;

