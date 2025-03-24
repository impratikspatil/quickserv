import { Box } from "@mui/system";
import React from "react";
import "./Reviews.css";
import ReviewCard from "../../shared/ReviewCard/ReviewCard";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Button, IconButton } from "@mui/material";

const reviewData = [
  {
    name: "John Doe",
    reviewCount: 12,
    rating: 5,
    comment: "Great service! Very professional and timely. Would definitely recommend to others.",
    avatar: ""
  },
  {
    name: "Sarah Smith",
    reviewCount: 8,
    rating: 4,
    comment: "Excellent work ethic and attention to detail. Could improve on timing.",
    avatar: ""
  },
  {
    name: "Mike Johnson",
    reviewCount: 15,
    rating: 5,
    comment: "Outstanding service quality. The team was very cooperative and skilled.",
    avatar: ""
  },
  {
    name: "Emily Brown",
    reviewCount: 6,
    rating: 4,
    comment: "Very satisfied with the service. Professional and courteous staff.",
    avatar: ""
  },
  {
    name: "David Wilson",
    reviewCount: 10,
    rating: 5,
    comment: "Exceptional service! They went above and beyond my expectations.",
    avatar: ""
  },
  {
    name: "Lisa Anderson",
    reviewCount: 9,
    rating: 4,
    comment: "Very good experience overall. Would use their services again.",
    avatar: ""
  }
];

const Reviews = () => {
  const actionButtons = (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
        startIcon={<ThumbUpAltOutlinedIcon />}
        sx={{
          color: '#666',
          '&:hover': {
            color: '#ff9900',
          },
        }}
      >
        Interested
      </Button>
      <Button
        startIcon={<ChatBubbleOutlineOutlinedIcon />}
        sx={{
          color: '#666',
          '&:hover': {
            color: '#ff9900',
          },
        }}
      >
        Comment
      </Button>
      <IconButton
        sx={{
          color: '#666',
          '&:hover': {
            color: '#ff9900',
          },
        }}
      >
        <ShareOutlinedIcon />
      </IconButton>
    </Box>
  );

  return (
    <div>
      <Box>
        <div className="rating_overall_parent">
          <div className="rating_overall">
            <div className="green_box">4.5</div>
            <div className="rating_info">
              <div className="rating_number">{reviewData.length} Ratings</div>
              <div className="rating_text">Rating index based on quickserv</div>
            </div>
          </div>
          <div className="user_reviews">
            <h3>User Reviews</h3>
            <div className="reviews-container">
              {reviewData.map((review, index) => (
                <ReviewCard 
                  key={index}
                  name={review.name}
                  reviewCount={review.reviewCount}
                  rating={review.rating}
                  comment={review.comment}
                  avatar={review.avatar}
                  actionButtons={actionButtons}
                />
              ))}
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Reviews;