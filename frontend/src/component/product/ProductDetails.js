import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productDetailsAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from './ReviewCard.js'
import Loader from '../layout/Loader/Loader'
import Alert from '../layout/Aleart/Aleart'

function ProductDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );


  useEffect((error) => {
    dispatch(getProductDetails(params.id));
  //  if (error!=null) {
  //   dispatch(clearErrors())
  //  }
  }, [dispatch, params.id,error])

  let Options = {
    edit: false,
    size: window.innerWidth < 600 ? 25 : 20,
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
  };



  return (

<Fragment>
{loading ? <Loader/> : error ? <Alert message={error} /> : 
    <Fragment >

      <div className="ProductDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage "
                  src={item.url}
                  key={item.url}
                  alt={`${i}  Slide`} />
              ))}
          </Carousel>
        </div>
        <div>
          <div className="detailsBlock-1">

            <h2>{product.name}</h2>
            <p>product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <ReactStars {...Options} /> <span>({product.NumberofReviews} reviews)</span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button>-</button>
                <input value="1" type="number" />
                <button>+</button>
              </div>
              <button>Add to cart</button>
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
      {
        product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}

          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )
      }

    </Fragment>
}


</Fragment>

  )
}

export default ProductDetails;
