import React from "react";

import profilepng from "../../images/Profile.png";
import "./ProductDetails.css";
import Rating from "@mui/material/Rating";

function ReviewCard({ review }) {
  let Options = {
    readOnly: true,
    // size: "large",
    value: review.rating,
    precision: 0.5,
  };
  return (
    <div className="reviewCard">
      <img src={profilepng} alt="user" />
      <p>{review.name}</p>
      <Rating {...Options} />
      <span>{review.comment}</span>
    </div>
  );
}

export default ReviewCard;
