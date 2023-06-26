import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const reviewSlice = createSlice({
  name: "password",
  initialState,

  reducers: {
    //post review

    reviewRequest: (state, action) => {
      state.loading = true;
    },
    reviewSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    },

    reviewFail(state, action) {
      console.log(action.payload)
      state.loading = false;
      state.error = action.payload.response?.data?.message;
    },
    reviewReset(state, action) {
      // state.loading = false;
      state.success = false;
    },

    clearEroors: (state, action) => {
      state.error = null;
    },
  },
});

export const {
  reviewRequest,
  reviewSuccess,
  reviewFail,
  reviewReset,
  clearEroors,
} = reviewSlice.actions;
export default reviewSlice.reducer;
