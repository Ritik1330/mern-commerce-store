import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function Product({ product }) {
  let Options = {
    edit: false,
    // count:5,
    size: window.innerWidth < 600 ? 25 : 20,
    // onChange:{ratingChanged},
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt="not found" />
      <p>{product.name}</p>
      <div>
        <ReactStars {...Options} /> <span>({product.NumberofReviews} reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
}
