import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import "./ReviewCard.css";

const ReviewCard = ({ 
  name = "Anonymous", 
  reviewCount = 0, 
  rating = 5, 
  comment = "", 
  avatar = "", 
  actionButtons 
}) => {
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  return (
    <Box className="review-card-container">
      <Card className="review-card">
        <Box className="review-card-header">
          <Avatar 
            className="review-card-avatar" 
            alt={name} 
            src={avatar || `https://ui-avatars.com/api/?name=${name}`}
          />
          <Box>
            <Typography className="review-card-name">{name}</Typography>
            <Typography className="review-card-reviews">
              {reviewCount} Reviews
            </Typography>
          </Box>
        </Box>

        <Box className="review-card-rating">
          <Typography className="review-card-stars" sx={{ color: '#ff9900' }}>
            {stars}
          </Typography>
        </Box>

        <Typography className="review-card-content">
          {comment}
        </Typography>

        <Box className="review-card-footer">
          {actionButtons}
        </Box>
      </Card>
    </Box>
  );
};


export default ReviewCard;