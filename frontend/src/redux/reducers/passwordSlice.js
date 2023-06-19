import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  message: null,
  otpsend: false,
  pssswordupdate: false,
};

const passwordSlice = createSlice({
  name: "password",
  initialState,

  reducers: {
    //login
    forgetPasswordRequest: (state, action) => {
      state.loading = true;
      state.message = null;
    },
    forgetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.otpsend = action.payload.success;
      state.message = action.payload.message;
    },

    forgetPasswordFail(state, action) {
      state.loading = false;
      state.otpsend = false;
      state.message = action.payload;
    },
    resetPasswordRequest: (state, action) => {
      state.loading = true;
      state.message = null;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.otpsend = false;
      state.message = action.payload.message;
      state.pssswordupdate = action.payload.success;
    },

    resetPasswordFail(state, action) {
      state.loading = false;
      state.otpsend = false;
      state.message = action.payload;
    },

    clearEroors: (state, action) => {
      state.error = null;
    },
  },
});

export const {
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  clearEroors,
} = passwordSlice.actions;
export default passwordSlice.reducer;
