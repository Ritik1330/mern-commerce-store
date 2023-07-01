import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  loading: false,
  error: undefined,
  success:false
};

const newProductSlice = createSlice({
  name: "newProduct",
  initialState,

  reducers: {
    newproductRequest: (state, action) => {
      state.loading = true;
    },
    newproductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.success = action.payload.success;
    },

    newproductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    newproductReset(state, action) {
      state.loading = false;
      state.success = false;
    },

    CLEAR_ERRORS: (state, action) => {
      // ...state
      state.error = null;
    },
  },
});

export const {
  newproductRequest,
  newproductSuccess,
  newproductFail,
  newproductReset,
  CLEAR_ERRORS,
} = newProductSlice.actions;

export default newProductSlice.reducer;
