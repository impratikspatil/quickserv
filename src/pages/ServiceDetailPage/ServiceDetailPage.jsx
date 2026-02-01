import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./ServiceDetailPage.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Typography,
  CircularProgress,
  Grid,
  Chip
} from "@mui/material";
import Reviews from "../../components/serviceDetails/reviews/Reviews";
import Pricing from "../../components/serviceDetails/pricing/Pricing";
import ContactCard from "../../components/serviceDetails/contact_card/ContactCard";
import AboutService from "../../components/serviceDetails/about/AboutService";
import Navbar from "../../components/shared/Navbar/Navbar";
import ServiceCard from '../../components/servicelist/ServiceInfoCard';
import axios from 'axios';
import BaseURL from '../../config';
import { toast } from "react-toastify";
import { useAuth } from "../../components/shared/AuthContext";

const CustomTabPanel = ({ value, index, children }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const ServiceDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userDetails, updateUserDetails } = useAuth();
  const { serviceId, openRatingDialog } = location.state || {};
  
  const [value, setValue] = useState(0);
  const [service, setService] = useState(null);
  const [similarServices, setSimilarServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  
  // Booking Dialog State
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  
  // Rating Dialog State
  const [ratingOpen, setRatingOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');

  useEffect(() => {
    if (serviceId) {
      fetchServiceDetails();
    }
  }, [serviceId]);

  // Check if service is favorited
  useEffect(() => {
    if (userDetails?.favoriteServiceIds && service) {
      const isFavorited = userDetails.favoriteServiceIds.includes(String(service.serviceId));
      setLiked(isFavorited);
    }
  }, [userDetails, service]);

  // Open rating dialog if coming from bookings page
  useEffect(() => {
    if (openRatingDialog && service) {
      setRatingOpen(true);
    }
  }, [openRatingDialog, service]);

  const fetchServiceDetails = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    
    try {
      // Fetch specific service details
      const response = await axios.get(`${BaseURL}api/services`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const allServices = response.data;
      const currentService = allServices.find(s => s.serviceId === serviceId);
      
      if (currentService) {
        setService(currentService);
        
        // Fetch similar services (same category)
        const similar = allServices
          .filter(s => 
            s.serviceCategory === currentService.serviceCategory && 
            s.serviceId !== serviceId
          )
          .slice(0, 3);
        setSimilarServices(similar);
      }
    } catch (error) {
      console.error('Error fetching service details:', error);
      toast.error('Failed to load service details');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLikeToggle = async () => {
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
        { serviceId: String(service.serviceId) },
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

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: service?.serviceName,
        text: `Check out ${service?.serviceName} on QuickServ!`,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleBookingOpen = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning("Please login to book services");
      navigate('/login');
      return;
    }
    setBookingOpen(true);
  };

  const handleBookingClose = () => {
    setBookingOpen(false);
    setBookingData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      message: ''
    });
  };

  const handleBookingSubmit = async () => {
    // Validate form
    if (!bookingData.name || !bookingData.phone || !bookingData.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      // Prepare booking data
      const bookingPayload = {
        serviceId: service.serviceId,
        userName: bookingData.name,
        userEmail: bookingData.email,
        userPhone: bookingData.phone,
        preferredDate: new Date(bookingData.date),
        preferredTime: bookingData.time,
        message: bookingData.message
      };

      // Send booking request to backend
      const response = await axios.post(
        `${BaseURL}api/bookings/create`,
        bookingPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Booking request sent successfully! We will contact you soon.');
      handleBookingClose();
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data || 'Failed to create booking. Please try again.');
    }
  };

  const handleRatingOpen = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning("Please login to rate services");
      navigate('/login');
      return;
    }
    setRatingOpen(true);
  };

  const handleRatingClose = () => {
    setRatingOpen(false);
    setUserRating(0);
    setUserReview('');
  };

  const handleRatingSubmit = async () => {
    if (userRating === 0) {
      toast.error('Please provide a rating');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      // Prepare review data
      const reviewPayload = {
        serviceId: service.serviceId,
        rating: userRating,
        comment: userReview
      };

      // Send review to backend
      const response = await axios.post(
        `${BaseURL}api/reviews/create`,
        reviewPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Thank you for your feedback!');
      handleRatingClose();
      
      // Refresh service details to show updated rating
      fetchServiceDetails();
    } catch (error) {
      console.error('Review error:', error);
      toast.error(error.response?.data || 'Failed to submit review. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: '#ff9900' }} />
      </Box>
    );
  }

  if (!service) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 2 }}>
        <Typography variant="h5">Service not found</Typography>
        <Button variant="contained" onClick={() => navigate('/service')} sx={{ bgcolor: '#ff9900' }}>
          Back to Services
        </Button>
      </Box>
    );
  }

  const pricingData = [{
    id: 1,
    subservice_name: service.serviceName,
    price: service.price?.toString() || '0',
    timeline: service.rateType || '/service',
    info: service.description || 'No description available',
  }];

  const displayImage = service.imageUrl 
    ? (service.imageUrl.startsWith('http') ? service.imageUrl : `${BaseURL}${service.imageUrl}`) 
    : null;

  return (
    <>
      <Navbar />
      <div className="service_details">
        {/* Header Section */}
        <header className="service_header">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <IconButton onClick={() => navigate(-1)} sx={{ color: '#666' }}>
              <ArrowBackIcon />
            </IconButton>
            <h1 className="service_title">
              {service.serviceName}
              {service.isVerified && (
                <VerifiedIcon 
                  sx={{ 
                    marginLeft: 1, 
                    fontSize: 30, 
                    color: '#28a745',
                    verticalAlign: 'middle' 
                  }} 
                />
              )}
            </h1>
            <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
              <IconButton 
                onClick={handleLikeToggle}
                sx={{ 
                  backgroundColor: liked ? '#fff' : 'transparent',
                  boxShadow: liked ? '0 2px 12px rgba(244, 67, 54, 0.4)' : 'none',
                  '&:hover': {
                    backgroundColor: liked ? '#fff' : 'rgba(244, 67, 54, 0.08)',
                    transform: 'scale(1.15)',
                  },
                  transition: 'all 0.2s ease',
                  padding: '10px'
                }}
              >
                {liked ? (
                  <FavoriteIcon 
                    sx={{ 
                      color: '#f44336',
                      fontSize: '32px',
                      filter: 'drop-shadow(0 2px 6px rgba(244, 67, 54, 0.5))'
                    }} 
                  />
                ) : (
                  <FavoriteBorderIcon 
                    sx={{ 
                      color: '#666',
                      fontSize: '32px',
                      '&:hover': {
                        color: '#f44336'
                      }
                    }} 
                  />
                )}
              </IconButton>
              <IconButton onClick={handleShare} sx={{ color: '#666', padding: '10px' }}>
                <ShareIcon sx={{ fontSize: '32px' }} />
              </IconButton>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1 }}>
            {service.tags?.slice(0, 5).map((tag, index) => (
              <Chip key={index} label={tag} size="small" sx={{ bgcolor: '#f0f4f8', color: '#666' }} />
            ))}
          </Box>
          
          <p className="service_location">
            <LocationOnIcon 
              sx={{ 
                fontSize: 20, 
                color: '#666',
                verticalAlign: 'middle'
              }} 
            />
            {service.address || service.location}
          </p>
          
          <div className="service_rating">
            <StarIcon sx={{ color: '#ffc107', marginRight: 0.5 }} />
            <span>{service.rating || '0'}</span>
            <span className="rating_count">({service.rateCount || 0} reviews)</span>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={handleRatingOpen}
              sx={{ 
                ml: 2, 
                textTransform: 'none',
                borderColor: '#ff9900',
                color: '#ff9900',
                '&:hover': {
                  borderColor: '#e68a00',
                  bgcolor: '#fff5e6'
                }
              }}
            >
              Rate Service
            </Button>
          </div>
        </header>

        {/* Image Section */}
        <Box className="service_images">
          {displayImage ? (
            <img 
              src={displayImage}
              alt={service.serviceName}
              className="service_image"
            />
          ) : (
            <Box 
              className="service_image"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f0f4f8',
                color: '#2563eb'
              }}
            >
              <Box component="span" className="material-icons" sx={{ fontSize: '120px' }}>
                home_repair_service
              </Box>
            </Box>
          )}
        </Box>

        {/* Main Content */}
        <div className="service_content">
          <Box className="service_main">
            <div className="tab_container">
              <Tabs
                value={value}
                onChange={handleTabChange}
                className="custom_tabs"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#ff9900',
                  },
                  '& .MuiTab-root': {
                    color: '#666',
                    '&.Mui-selected': {
                      color: '#ff9900',
                    },
                  },
                }}
              >
                <Tab label="About" />
                <Tab label="Pricing" />
                <Tab label="Reviews" />
              </Tabs>

              <CustomTabPanel value={value} index={0}>
                <AboutService description={service.description} />
              </CustomTabPanel>
              
              <CustomTabPanel value={value} index={1}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {pricingData.map((pricing) => (
                    <Pricing
                      key={pricing.id}
                      subservice_name={pricing.subservice_name}
                      price={pricing.price}
                      timeline={pricing.timeline}
                      info={pricing.info}
                    />
                  ))}
                </Box>
              </CustomTabPanel>
              
              <CustomTabPanel value={value} index={2}>
                <Reviews serviceId={service.serviceId} rating={service.rating} rateCount={service.rateCount} />
              </CustomTabPanel>
            </div>

            {/* Similar Services Section */}
            {similarServices.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                  Similar Services
                </Typography>
                <Grid container spacing={2}>
                  {similarServices.map((simService) => (
                    <Grid item xs={12} key={simService.serviceId}>
                      <ServiceCard
                        id={simService.serviceId}
                        serviceName={simService.serviceName}
                        rating={simService.rating || 0}
                        location={simService.address || simService.location}
                        contactNumber={simService.whatsappNumber}
                        imageUrl={simService.imageUrl 
                          ? (simService.imageUrl.startsWith('http') ? simService.imageUrl : `${BaseURL}${simService.imageUrl}`) 
                          : null}
                        ratingCount={simService.ratingCount || 0}
                        rateType={simService.rateType || '/service'}
                        charges={simService.price || 0}
                        tags={simService.tags || []}
                        isVerified={simService.isVerified || false}
                        rateCount={simService.rateCount || 0}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>

          {/* Sidebar */}
          <Box className="service_sidebar">
            <ContactCard 
              number={service.whatsappNumber}
              address={service.address || service.location}
            />
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleBookingOpen}
              sx={{
                mt: 2,
                bgcolor: '#ff9900',
                color: 'white',
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#e68a00',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(255, 153, 0, 0.3)'
                }
              }}
            >
              Book Now
            </Button>
          </Box>
        </div>

        {/* Booking Dialog */}
        <Dialog open={bookingOpen} onClose={handleBookingClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ bgcolor: '#ff9900', color: 'white', fontWeight: 600 }}>
            Book Service: {service.serviceName}
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Full Name *"
              value={bookingData.name}
              onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={bookingData.email}
              onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone Number *"
              value={bookingData.phone}
              onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Preferred Date *"
              type="date"
              value={bookingData.date}
              onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Preferred Time"
              type="time"
              value={bookingData.time}
              onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Message / Special Requirements"
              multiline
              rows={3}
              value={bookingData.message}
              onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
              margin="normal"
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleBookingClose} sx={{ color: '#666' }}>
              Cancel
            </Button>
            <Button 
              onClick={handleBookingSubmit} 
              variant="contained"
              sx={{ 
                bgcolor: '#ff9900',
                '&:hover': { bgcolor: '#e68a00' }
              }}
            >
              Submit Booking
            </Button>
          </DialogActions>
        </Dialog>

        {/* Rating Dialog */}
        <Dialog open={ratingOpen} onClose={handleRatingClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ bgcolor: '#ff9900', color: 'white', fontWeight: 600 }}>
            Rate & Review: {service.serviceName}
          </DialogTitle>
          <DialogContent sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              How was your experience?
            </Typography>
            <Rating
              value={userRating}
              onChange={(event, newValue) => setUserRating(newValue)}
              size="large"
              sx={{ fontSize: '3rem' }}
            />
            <TextField
              fullWidth
              label="Write your review"
              multiline
              rows={4}
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              margin="normal"
              sx={{ mt: 3 }}
              placeholder="Tell us about your experience with this service..."
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleRatingClose} sx={{ color: '#666' }}>
              Cancel
            </Button>
            <Button 
              onClick={handleRatingSubmit} 
              variant="contained"
              sx={{ 
                bgcolor: '#ff9900',
                '&:hover': { bgcolor: '#e68a00' }
              }}
            >
              Submit Review
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ServiceDetailPage;
