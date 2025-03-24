import React from "react";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./AboutService.css";

const AboutService = ({
  summary = "Fitness center specializing in personalized training, weight loss consulting, and diverse workout programs.",
  yoe = "2020",
  timings = "6:00 AM - 10:00 PM",
  location = "Near Kaka Halwai, Near Abhinav Kala, Sadashiv Peth, Pune",
  features = [
    "Personal Training Programs",
    "State-of-the-art Equipment",
    "Certified Trainers",
    "Nutrition Consultation",
    "Locker Facility",
    "Shower Facility",
    "Flexible Timing",
    "Diet Plans"
  ]
}) => {
  return (
    <div className="about-service">
      <Typography variant="h6" className="about-title">
        About Us
      </Typography>
      
      <Typography className="summary-text">
        {summary}
      </Typography>

      <div className="info-section">
        <div className="info-item">
          <div className="info-header">
            <LocationOnIcon className="info-icon" />
            <Typography variant="h6">Location</Typography>
          </div>
          <Typography className="info-value">{location}</Typography>
        </div>

        <div className="info-item">
          <div className="info-header">
            <AccessTimeIcon className="info-icon" />
            <Typography variant="h6">Working Hours</Typography>
          </div>
          <Typography className="info-value">{timings}</Typography>
        </div>

        <div className="info-item">
          <div className="info-header">
            <EventIcon className="info-icon" />
            <Typography variant="h6">Established</Typography>
          </div>
          <Typography className="info-value">Since {yoe}</Typography>
        </div>
      </div>

      <Typography variant="h6" className="features-title">
        Features & Amenities
      </Typography>
      
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <CheckCircleIcon className="feature-icon" />
            <Typography>{feature}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutService;