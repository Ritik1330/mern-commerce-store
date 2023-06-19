import axios from 'axios'
import {
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  clearEroors,
} from "../reducers/passwordSlice";

//password foget otp
export const forgetPassword = (myForm) => async (dispatch) => {
  try {
    dispatch(forgetPasswordRequest());

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v1/password/forgate",
      myForm,
      config
    );

    dispatch(forgetPasswordSuccess(data));
  } catch (error) {
    dispatch(forgetPasswordFail(error.response.data.message));
  }
};
//reset password
export const resetPassword = (myForm) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      "/api/v1/password/reset",
      myForm,
      config
    );

    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(resetPasswordFail(error.response.data.message));
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(clearEroors());
};
