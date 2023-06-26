import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  clearErrors,
  getProductDetails,
} from "../../redux/actions/productDetailsAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import Alert from "../layout/Aleart/Aleart";
import { addToCartitem } from "../../redux/actions/cartAction";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { createReview } from "../../redux/actions/reviewAction";
import { reviewReset } from "../../redux/reducers/reviewSlice";

function ProductDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success } = useSelector((state) => state.newReview);
  const [quantity, setQuqntity] = useState(1);
  // const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [productId, setproductId] = useState(params.id);

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    // console.log("submit hedaler");
    dispatch(createReview(rating, comment, productId));
    open ? setOpen(false) : setOpen(true);
  };
  const increaseQuantity = () => {
    // console.log(product.stock )
    // console.log(first)
    if (product.stock >= quantity + 1) {
      setQuqntity(quantity + 1);
    }
  };
  const decreseQuantity = () => {
    if (quantity >= 2) {
      setQuqntity(quantity - 1);
    }
  };
  let addToCartHendaler = () => {
    dispatch(addToCartitem(params.id, quantity));
    toast("product add to cart");
  };

  useEffect(() => {
    dispatch(getProductDetails(params.id));
    if (success === true) {
      dispatch(reviewReset());
    }

    //  if (error!=null) {
    //   dispatch(clearErrors())
    //  }
  }, [dispatch, params.id, error, success]);

  let Options = {
    readOnly: true,
    size: "large",
    value: product.ratings,
    precision: 0.5,
  };

  return (
    <Fragment>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert message={error} />
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage "
                      src={item.url}
                      key={item.url}
                      alt={`${i}  Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...Options} />{" "}
                <span>({product.NumberofReviews} reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreseQuantity}>-</button>
                    <input value={quantity} type="number" readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHendaler}> Add to cart</button>
                </div>
                <p>
                  Status:{""}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "outoffstock" : "instock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <div className="submitReview" onClick={submitReviewToggle}>
                Submit review
              </div>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review, i) => (
                  <ReviewCard review={review} key={i} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductDetails;
