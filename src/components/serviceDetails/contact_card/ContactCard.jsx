import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./ContactCard.css";

const ContactCard = ({
  number = "12365676786",
  address = "Nikhil Pride Building 2nd Floor, Tilak Road, Sadashiv Peth, Pune - 411030 (Near Kaka Halwai, Near Abhinav Kala)",
}) => {
  return (
    <Card className="contact-card">
      <CardContent>
        <Typography variant="h6" className="section-title">
          Contact
        </Typography>
        <Box className="contact-item">
          <PhoneIcon sx={{ color: '#ff9900', marginRight: 1 }} />
          <Typography>{number}</Typography>
        </Box>
        <hr />
        
        <Typography variant="h6" className="section-title">
          Address
        </Typography>
        <Box className="contact-item">
          <LocationOnIcon sx={{ color: '#666', marginRight: 1 }} />
          <Typography>{address}</Typography>
        </Box>
        <hr />
        
        <Box className="contact-item">
          <AccessTimeIcon sx={{ color: '#666', marginRight: 1 }} />
          <Typography>Opens at : 8:00 AM - 7:00 PM</Typography>
        </Box>
        <hr />
        
        <Box className="social-links">
          <Button
            startIcon={<WhatsAppIcon />}
            variant="contained"
            className="social-button whatsapp"
            sx={{ backgroundColor: '#028b06' }}
          >
            WhatsApp
          </Button>
          <Button
            startIcon={<InstagramIcon />}
            variant="contained"
            className="social-button instagram"
          >
            Instagram
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactCard;