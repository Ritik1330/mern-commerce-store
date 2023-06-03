import React from "react";
import ReactStars from "react-rating-stars-component";
import profilepng from '../../images/Profile.png'
import "./ProductDetails.css";


function ReviewCard({review}) {
    console.log(review)
  let Options = {
    edit: false,
    size: window.innerWidth < 600 ? 25 : 20,
    activeColor: "tomato",
    value: review.rating,
    isHalf: true,
  };

  return <div className="reviewCard">

<img src={profilepng} alt="user" />
    <p>{review.name}</p>
<ReactStars {...Options} />
<span>{review.comment}</span>
  </div>;
}

export default ReviewCard;
