import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDeleted: false,
  isUpdated: false,
  loading: false,
  error: null,
};

const orderslice = createSlice({
  name: "order",
  initialState,

  reducers: {
    //create order
    deleteorderRequest: (state, action) => {
      state.loading = true;
    },
    deleteorderSuccess: (state, action) => {
      state.loading = false;
      state.isOuder = true;
      state.isDeleted = true;
    },
    deleteorderResete: (state, action) => {
      state.loading = false;
      state.isDeleted = false;
    },

    deleteorderFail(state, action) {
      state.loading = false;
      state.isOuder = true;
      state.error = action.payload;
    },
    //update
    updateorderRequest: (state, action) => {
      state.loading = true;
    },
    updateorderSuccess: (state, action) => {
      state.loading = false;

      state.isUpdated = true;
    },
    updateorderResete: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
    },

    updateorderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearEroors: (state, action) => {
      state.error = null;
    },
  },
});

export const {
  deleteorderRequest,
  deleteorderSuccess,
  deleteorderFail,
  deleteorderResete,
  clearEroors,
  updateorderRequest,
  updateorderSuccess,
  updateorderFail,
  updateorderResete
} = orderslice.actions;
export default orderslice.reducer;
