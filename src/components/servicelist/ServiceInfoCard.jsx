import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme/theme";
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { VerifiedOutlined } from '@mui/icons-material';
import { Box, Button, Skeleton, Fade, Chip } from "@mui/material";
import './ServiceInfoCard.css';

const ServiceCardInfo = ({
  imageUrl,
  serviceName,
  rating,
  location,
  contactNumber,
  ratingCount,
  isVerified = true,
  rateType,
  charges,
  tags = []
}) => {
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLikeToggle = () => {
    setLiked(!liked);
  };

  if (isLoading) {
    return (
      <Card className="service-card loading">
        <Skeleton variant="rectangular" className="service-image" />
        <Box className="service-content">
          <CardContent>
            <Box className="service-header">
              <Skeleton variant="text" width="40%" height={28} />
              <Skeleton variant="circular" width={32} height={32} />
            </Box>
            <Box className="service-rating">
              <Skeleton variant="text" width="120px" height={24} />
              <Skeleton variant="text" width="60px" height={20} />
              <Skeleton variant="circular" width={20} height={20} />
            </Box>
            <Box className="service-location">
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="text" width="60%" height={20} />
            </Box>
            <Box className="service-tags">
              <Skeleton variant="rectangular" width="80px" height={24} sx={{ borderRadius: '4px' }} />
              <Skeleton variant="rectangular" width="80px" height={24} sx={{ borderRadius: '4px' }} />
              <Skeleton variant="rectangular" width="80px" height={24} sx={{ borderRadius: '4px' }} />
            </Box>
            <Box className="service-footer">
              <Box className="service-actions">
                <Skeleton variant="rectangular" width="100px" height={32} sx={{ borderRadius: '6px' }} />
                <Skeleton variant="rectangular" width="100px" height={32} sx={{ borderRadius: '6px' }} />
                <Skeleton variant="rectangular" width="100px" height={32} sx={{ borderRadius: '6px' }} />
              </Box>
              <Skeleton variant="text" width="80px" height={24} />
            </Box>
          </CardContent>
        </Box>
      </Card>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Card className="service-card">
        <CardMedia
          component="img"
          className="service-image"
          image={imageUrl}
          alt={serviceName}
        />
        <Box className="service-content">
          <CardContent>
            <Box className="service-header">
              <Typography variant="h6" className="service-name">
                {serviceName}
              </Typography>
              <IconButton 
                aria-label="like" 
                onClick={handleLikeToggle}
                className="like-button"
                size="small"
              >
                <FavoriteIcon color={liked ? "error" : "inherit"} />
              </IconButton>
            </Box>

            <Box className="service-rating">
              <Rating 
                name="read-only" 
                value={rating} 
                readOnly 
                size="small" 
                className="rating-stars"
              />
              {ratingCount > 0 && (
                <Typography variant="caption" className="rating-count">
                  ({ratingCount})
                </Typography>
              )}
              {isVerified && (
                <VerifiedOutlined 
                  color="success" 
                  className="verified-icon"
                />
              )}
            </Box>

            <Box className="service-location">
              <LocationOnOutlinedIcon className="location-icon" />
              <Typography variant="body2" className="location-text">
                {location}
              </Typography>
            </Box>

            <Box className="service-tags">
              {tags.slice(0, 3).map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  className="service-tag"
                />
              ))}
            </Box>

            <Box className="service-footer">
              <Box className="service-actions">
                <Button
                  startIcon={<CallIcon />}
                  variant="contained"
                  className="action-button call-button"
                  size="small"
                  sx={{
                    background: '#028b06 !important',
                    '&:hover': {
                      background: '#027305 !important',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(2, 139, 6, 0.2)'
                    }
                  }}
                >
                  {contactNumber}
                </Button>
                <Button
                  startIcon={<WhatsAppIcon />}
                  variant="outlined"
                  className="action-button whatsapp-button"
                  size="small"
                >
                  WhatsApp
                </Button>
                <Button
                  startIcon={<QuestionAnswerIcon />}
                  variant="contained"
                  className="action-button enquiry-button"
                  size="small"
                  sx={{
                    background: '#2563eb !important',
                    '&:hover': {
                      background: '#1d4ed8 !important',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                    }
                  }}
                >
                  Enquiry
                </Button>
              </Box>

              <Typography variant="subtitle1" className="service-price">
                {charges}{rateType}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default ServiceCardInfo;
  