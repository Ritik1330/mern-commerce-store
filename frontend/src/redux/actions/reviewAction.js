import axios from "axios";
import {
  reviewRequest,
  reviewSuccess,
  reviewFail,
  reviewReset,
  clearEroors,
} from "../reducers/reviewSlice";

export const createReview =
  (rating, comment, productId) => async (dispatch) => {
    //    const data=
    try {
      dispatch(reviewRequest());

      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        "/api/v1/review",
        {
          rating: rating,
          comment: comment,
          productId: productId,
        },
        config
      );
      dispatch(reviewSuccess(data));
    } catch (error) {
      dispatch(reviewFail(error));
    }
  };
