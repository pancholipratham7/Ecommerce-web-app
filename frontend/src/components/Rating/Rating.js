import React from "react";
import Star from "@material-ui/icons/StarBorder";
import StarHalf from "@material-ui/icons/StarHalf";
import StarFull from "@material-ui/icons/Grade";
import classes from "./Rating.module.css";

// Rating component

const Rating = (props) => {
  const { rating, numReviews } = props;
  return (
    <div className={classes["rating-stars"]}>
      {rating >= 1 ? (
        <StarFull className="rating-star" />
      ) : rating >= 0.5 ? (
        <StarHalf className="rating-star" />
      ) : (
        <Star className="rating-star" />
      )}
      {rating >= 2 ? (
        <StarFull className="rating-star" />
      ) : rating >= 1.5 ? (
        <StarHalf className="rating-star" />
      ) : (
        <Star className="rating-star" />
      )}
      {rating >= 3 ? (
        <StarFull className="rating-star" />
      ) : rating >= 2.5 ? (
        <StarHalf className="rating-star" />
      ) : (
        <Star className="rating-star" />
      )}
      {rating >= 4 ? (
        <StarFull className="rating-star" />
      ) : rating >= 3.5 ? (
        <StarHalf className="rating-star" />
      ) : (
        <Star className="rating-star" />
      )}
      {rating >= 5 ? (
        <StarFull className="rating-star" />
      ) : rating >= 4.5 ? (
        <StarHalf className="rating-star" />
      ) : (
        <Star className="rating-star" />
      )}
      <span className={classes.f}>{`(${numReviews} reviews)`}</span>
    </div>
  );
};

export default Rating;
