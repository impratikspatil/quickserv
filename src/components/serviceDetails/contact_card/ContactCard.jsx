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
import CallIcon from "@mui/icons-material/Call";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./ContactCard.css";

const ContactCard = ({
  number = "12365676786",
  address = "Nikhil Pride Building 2nd Floor, Tilak Road, Sadashiv Peth, Pune - 411030 (Near Kaka Halwai, Near Abhinav Kala)",
}) => {
  return (
    <Card className="contact-card">
      <h3>Contact</h3>
      <div className="phone-number">
        <CallIcon /> {number}
      </div>
      <hr></hr>
      <h3>Address</h3>
      <div className="company-address">{address}</div>
      <hr></hr>
      <p>
        {" "}
        <AccessTimeIcon /> Opens at : 8:00 AM - 7:00 PM
      </p>
      <hr></hr>
      <p>
        <StarIcon /> Tap to Rate
      </p>
      <hr></hr>
      <p>
        <InstagramIcon /> Social Pages
      </p>
    </Card>
  );
};

export default ContactCard;
