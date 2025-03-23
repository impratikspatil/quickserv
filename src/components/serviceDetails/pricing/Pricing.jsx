import React from "react";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import "./Pricing.css";

const Pricing = ({
  subservice_name = "subservice_name",
  price = "price",
  timeline = "timline",
  info = "information about the subservice",
}) => {
  return (
    <div>
      <Box className="pricing-card-container">
        <Card className="pricing-card">
          <Box className="pricing-card-header">
            <Typography className="pricing-card-name">
              {subservice_name}
            </Typography>
          </Box>
          <CardContent className="review-card-content">
            <Typography>
              Rs. {price} / {timeline}
            </Typography>
            <Typography>{info}</Typography>
          </CardContent>
          <Box className="pricing-card-footer">
            <Button
              startIcon={<ThumbUpAltOutlinedIcon />}
              className="pricing-card-footer-button"
            >
              Intrested
            </Button>
            <IconButton>
              <ShareOutlinedIcon />
            </IconButton>
          </Box>
        </Card>
      </Box>
    </div>
  );
};

export default Pricing;
