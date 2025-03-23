import { Box } from "@mui/system";
import React from "react";
import "./reviews.css";
import ReviewCard from "../../shared/ReviewCard/ReviewCard";

const Reviews = () => {
  return (
    <div>
      <Box>
        <div className="rating_overall_parent">
          <div className="rating_overall">
            <div className="green_box">4.5</div>
            <div className="rating_info">
              <div className="rating_number">126 Ratings</div>
              <div className="rating_text">Rating index based on quickserv</div>
            </div>
          </div>
          <div className="user_reviews">
            <h3>User Reviews</h3>
            <ReviewCard />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Reviews;
