import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import './ServiceInfoCard.css';
import Icon from '@mui/material/Icon';
import axios from 'axios';
import BaseURL from '../../config';
import { toast } from 'react-toastify';
import { useAuth } from '../shared/AuthContext';


const getUserIdFromToken = (token) => {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    // Use 'sub' or 'userId' depending on what your Spring Boot backend puts in the JWT
    return decoded.userId || decoded.sub; 
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const ServiceCardInfo = ({
  id,
  imageUrl,
  categoryIcon,
  serviceName,
  rating,
  location,
  contactNumber,
  ratingCount,
  isVerified = true,
  rateType,
  charges,
  tags = [],
  initialLiked = false
}) => {
  const navigate = useNavigate();
  const { userDetails, updateUserDetails } = useAuth();
  const [liked, setLiked] = useState(initialLiked);
  const [isLoading, setIsLoading] = useState(true);

  // Check if this service is in user's favorites
  useEffect(() => {
    if (userDetails?.favoriteServiceIds) {
      const isFavorited = userDetails.favoriteServiceIds.includes(String(id));
      setLiked(isFavorited);
    }
  }, [userDetails, id]);

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = () => {
    navigate('/service_details', { state: { serviceId: id } });
  };

  const handleLikeToggle = async (e) => {
    e.stopPropagation(); // Prevent card click when clicking like
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning("Please login to favorite services");
      navigate('/login');
      return;
    }
  
    try {
      // Optimistically update UI
      const newLikedState = !liked;
      setLiked(newLikedState);
      
      // Call API to toggle favorite
      const response = await axios.post(
        `${BaseURL}api/users/favorites/toggle`, 
        { serviceId: String(id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Backend returns updated user object - use it directly!
      if (response.data && response.data.favoriteServiceIds) {
        updateUserDetails(response.data);
      }
      
      toast.success(newLikedState ? 'Added to favorites' : 'Removed from favorites');
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error('Failed to update favorites');
      // Revert the optimistic update on error
      setLiked(liked);
    }
  };

  const handleCall = (e) => {
    e.stopPropagation(); // Prevent card click
    window.location.href = `tel:${contactNumber}`;
  };
  
  const handleWhatsApp = (e) => {
    e.stopPropagation(); // Prevent card click
    // Cleans the number and opens WhatsApp
    const cleanNumber = contactNumber.replace(/\D/g, ''); 
    window.open(`https://wa.me/${cleanNumber}?text=Hi, I found your service on QuickServ!`, '_blank');
  };

  const handleEnquiry = (e) => {
    e.stopPropagation(); // Prevent card click
    // Navigate to detail page
    navigate('/service_details', { state: { serviceId: id } });
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
      <Card className="service-card" onClick={handleCardClick} sx={{ cursor: 'pointer', '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.15)' } }}>
      <Box className="service-image-container">
  {imageUrl ? (
    <CardMedia
      component="img"
      className="service-image"
      image={imageUrl}
      alt={serviceName}
    />
  ) : (
    <Box
      className="service-image-fallback"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f0f4f8', // Light professional background
        color: '#2563eb'    // Matches your "Enquiry" button blue
      }}
    >
      {/* Import Icon from '@mui/material/Icon' */}
      <Box 
        component="span" 
        className="material-icons" 
        sx={{ fontSize: '64px' }}
      >
        {categoryIcon || 'home_repair_service'} 
      </Box>
    </Box>
  )}
</Box>
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
                sx={{
                  backgroundColor: liked ? '#fff' : 'transparent',
                  boxShadow: liked ? '0 2px 8px rgba(244, 67, 54, 0.3)' : 'none',
                  '&:hover': {
                    backgroundColor: liked ? '#fff' : 'rgba(244, 67, 54, 0.08)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                {liked ? (
                  <FavoriteIcon 
                    sx={{ 
                      color: '#f44336',
                      fontSize: '28px',
                      filter: 'drop-shadow(0 2px 4px rgba(244, 67, 54, 0.4))'
                    }} 
                  />
                ) : (
                  <FavoriteBorderIcon 
                    sx={{ 
                      color: '#666',
                      fontSize: '28px',
                      '&:hover': {
                        color: '#f44336'
                      }
                    }} 
                  />
                )}
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
                  onClick={handleCall}
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
                  onClick={handleWhatsApp}
                  className="action-button whatsapp-button"
                  size="small"
                >
                  WhatsApp
                </Button>
                <Button
                  startIcon={<QuestionAnswerIcon />}
                  variant="contained"
                  onClick={handleEnquiry}
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
  