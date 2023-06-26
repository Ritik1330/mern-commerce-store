import React from "react";
import { Link } from "react-router-dom";
// import ReactStars from "react-rating-stars-component";
import Rating from "@mui/material/Rating";
export default function productCard({ product }) {
  let Options = {
    readOnly: true,
    // size: "large",
    value: product.ratings,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt="not found" />
      <p>{product.name}</p>
      <div>
        <Rating {...Options} /> <span className="productCardRatingSpan">({product.NumberofReviews} reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
}
