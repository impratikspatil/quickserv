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

const ReviewCard = () => {
  return (
    <Box className="review-card-container">
      <Card className="review-card">
        <Box className="review-card-header">
          <Avatar
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="review-card-avatar"
          />
          <Box>
            <Typography className="review-card-name">Rutuja</Typography>
            <Typography className="review-card-reviews">3 reviews</Typography>
          </Box>
        </Box>

        <Box className="review-card-rating">
          <Typography className="review-card-stars">⭐⭐⭐⭐⭐</Typography>
          <Typography className="review-card-tag">Great atmosphere</Typography>
        </Box>

        <CardContent className="review-card-content">
          <Typography>
            I had a great experience at City Point Fitness. The atmosphere is
            excellent and the staff are very friendly and helpful. I feel
            comfortable working out there. Overall, it is a good gym with a
            positive environment.
          </Typography>
        </CardContent>

        <Box className="review-card-footer">
          <Button
            startIcon={<ThumbUpAltOutlinedIcon />}
            className="review-card-footer-button"
          >
            Helpful
          </Button>
          <Button
            startIcon={<ChatBubbleOutlineOutlinedIcon />}
            className="review-card-footer-button"
          >
            Comment
          </Button>
          <IconButton>
            <ShareOutlinedIcon />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
};

export default ReviewCard;
