import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDeleted: false,
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
      state.error = action.payload.message;
    },
    updatePasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordReset: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
    },
    admindeleteUserRequest: (state, action) => {
      state.loading = true;
    },
    admindeleteUserSuccess: (state, action) => {
      state.loading = false;
      state.isOuder = true;
      state.isDeleted = true;
    },
    admindeleteUserResete: (state, action) => {
      state.loading = false;
      state.isDeleted = false;
    },

    admindeleteUserFail(state, action) {
      state.loading = false;
      state.isOuder = true;
      state.error = action.payload;
    },
    //update
    adminupdateUserRequest: (state, action) => {
      state.loading = true;
    },
    adminupdateUserSuccess: (state, action) => {
      state.loading = false;

      state.isUpdated = true;
    },
    adminupdateUserResete: (state, action) => {
      //   state.loading = false;
      state.isUpdated = false;
    },

    adminupdateUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearEroors: (state, action) => {
      state.error = null;
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
  admindeleteUserRequest,
  admindeleteUserSuccess,
  admindeleteUserFail,
  admindeleteUserResete,
  clearEroors,
  adminupdateUserRequest,
  adminupdateUserSuccess,
  adminupdateUserFail,
  adminupdateUserResete,
} = profileUpdateSlice.actions;

export default profileUpdateSlice.reducer;
