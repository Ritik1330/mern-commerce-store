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

function ProductDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const [quantity, setQuqntity] = useState(1);
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
    //  if (error!=null) {
    //   dispatch(clearErrors())
    //  }
  }, [dispatch, params.id, error]);

  let Options = {
    edit: false,
    size: window.innerWidth < 600 ? 25 : 20,
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
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
                <ReactStars {...Options} />{" "}
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
              <div className="submitReview">Submit review</div>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
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
