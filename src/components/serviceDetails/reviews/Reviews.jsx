import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import "./Reviews.css";
import ReviewCard from "../../shared/ReviewCard/ReviewCard";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Button, IconButton, CircularProgress, Typography } from "@mui/material";
import axios from 'axios';
import BaseURL from '../../../config';

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

const Reviews = ({ serviceId, rating, rateCount }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (serviceId) {
      fetchReviews();
    }
  }, [serviceId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${BaseURL}api/reviews/service/${serviceId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Use fallback data if API fails
      setReviews(reviewData);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Box>
        <div className="rating_overall_parent">
          <div className="rating_overall">
            <div className="green_box">{rating || '0'}</div>
            <div className="rating_info">
              <div className="rating_number">{rateCount || reviews.length} Ratings</div>
              <div className="rating_text">Rating index based on quickserv</div>
            </div>
          </div>
          <div className="user_reviews">
            <h3>User Reviews</h3>
            {reviews.length > 0 ? (
              <div className="reviews-container">
                {reviews.map((review, index) => (
                  <ReviewCard 
                    key={review.reviewId || index}
                    name={review.userName}
                    reviewCount={review.helpful || 0}
                    rating={review.rating}
                    comment={review.comment}
                    avatar={review.avatar || ''}
                    actionButtons={actionButtons}
                  />
                ))}
              </div>
            ) : (
              <Box sx={{ textAlign: 'center', p: 4, color: '#666' }}>
                <Typography variant="h6">No reviews yet</Typography>
                <Typography variant="body2">Be the first to review this service!</Typography>
              </Box>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Reviews;