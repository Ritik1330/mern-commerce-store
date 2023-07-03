import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  isUpdated: false,
  loading: false,
  error: null,
};

const Userslice = createSlice({
  name: "profile",
  initialState,

  reducers: {
    //create User
 
  },
});

export const {
  
} = Userslice.actions;
export default Userslice.reducer;
