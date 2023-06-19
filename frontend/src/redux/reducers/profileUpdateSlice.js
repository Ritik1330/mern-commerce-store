import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   isUpdated: {},
  isUpdated: false,
  loading: false,
  error: undefined,
};

const profileUpdateSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {
    // profile update
    updateProfileRequest: (state, action) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    },
    updateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileReset: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
    },

    
    //password update
    updatePasswordRequest: (state, action) => {
      state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
      state.error= action.payload.message;

    },
    updatePasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordReset: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
    },
    
  },
});

export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileReset,
  updateProfileFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordReset,
  updatePasswordFail,
} = profileUpdateSlice.actions;

export default profileUpdateSlice.reducer;
