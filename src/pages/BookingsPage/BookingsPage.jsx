import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Grid,
  CircularProgress,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Paper,
  Alert
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  Phone,
  Email,
  LocationOn,
  Cancel,
  CheckCircle,
  Pending,
  Info,
  Close
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseURL from '../../config';
import Navbar from '../../components/shared/Navbar/Navbar';
import { toast } from 'react-toastify';
import './BookingsPage.css';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [services, setServices] = useState({});
  const navigate = useNavigate();

  // Fetch user's bookings
  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings based on active tab
  useEffect(() => {
    filterBookings();
  }, [activeTab, bookings]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login to view your bookings');
        navigate('/login');
        return;
      }

      const response = await axios.get(`${BaseURL}api/bookings/my-bookings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const bookingsData = response.data;
      setBookings(bookingsData);

      // Fetch service details for each booking
      const serviceIds = [...new Set(bookingsData.map(b => b.serviceId))];
      const servicePromises = serviceIds.map(id => 
        axios.get(`${BaseURL}api/services/${id}`)
      );

      const serviceResponses = await Promise.all(servicePromises);
      const servicesMap = {};
      serviceResponses.forEach(res => {
        if (res.data) {
          servicesMap[res.data.serviceId] = res.data;
        }
      });
      setServices(servicesMap);

    } catch (error) {
      console.error('Error fetching bookings:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } else {
        toast.error('Failed to load bookings');
      }
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    if (activeTab === 0) {
      // All bookings
      setFilteredBookings(bookings);
    } else if (activeTab === 1) {
      // Pending
      setFilteredBookings(bookings.filter(b => b.status === 'PENDING'));
    } else if (activeTab === 2) {
      // Confirmed
      setFilteredBookings(bookings.filter(b => b.status === 'CONFIRMED'));
    } else if (activeTab === 3) {
      // Completed
      setFilteredBookings(bookings.filter(b => b.status === 'COMPLETED'));
    } else if (activeTab === 4) {
      // Cancelled
      setFilteredBookings(bookings.filter(b => b.status === 'CANCELLED'));
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setCancelDialogOpen(true);
  };

  const handleCancelBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${BaseURL}api/bookings/${selectedBooking.id}/cancel`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      toast.success('Booking cancelled successfully');
      setCancelDialogOpen(false);
      fetchBookings(); // Refresh bookings
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING':
        return <Pending sx={{ fontSize: 18 }} />;
      case 'CONFIRMED':
        return <CheckCircle sx={{ fontSize: 18 }} />;
      case 'COMPLETED':
        return <CheckCircle sx={{ fontSize: 18 }} />;
      case 'CANCELLED':
        return <Cancel sx={{ fontSize: 18 }} />;
      default:
        return <Info sx={{ fontSize: 18 }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'CONFIRMED':
        return 'info';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Not specified';
    return timeString;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh'
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box className="bookings-page" sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', pt: 3, pb: 6 }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              My Bookings
            </Typography>
            <Typography variant="body1" color="text.secondary">
              View and manage all your service bookings
            </Typography>
          </Box>

          {/* Tabs */}
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderBottom: 1,
                borderColor: 'divider'
              }}
            >
              <Tab label={`All (${bookings.length})`} />
              <Tab label={`Pending (${bookings.filter(b => b.status === 'PENDING').length})`} />
              <Tab label={`Confirmed (${bookings.filter(b => b.status === 'CONFIRMED').length})`} />
              <Tab label={`Completed (${bookings.filter(b => b.status === 'COMPLETED').length})`} />
              <Tab label={`Cancelled (${bookings.filter(b => b.status === 'CANCELLED').length})`} />
            </Tabs>
          </Paper>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Info sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No bookings found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {activeTab === 0 
                  ? "You haven't made any bookings yet. Start exploring services!"
                  : `No ${['', 'pending', 'confirmed', 'completed', 'cancelled'][activeTab]} bookings`
                }
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/service')}
              >
                Browse Services
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredBookings.map((booking) => {
                const service = services[booking.serviceId];
                
                return (
                  <Grid item xs={12} key={booking.id}>
                    <Card 
                      sx={{ 
                        display: 'flex',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4
                        }
                      }}
                    >
                      {/* Service Image */}
                      {service && (
                        <CardMedia
                          component="img"
                          sx={{
                            width: 200,
                            objectFit: 'cover',
                            cursor: 'pointer',
                            display: { xs: 'none', sm: 'block' }
                          }}
                          image={service.imageUrl || 'https://via.placeholder.com/200'}
                          alt={service.serviceName}
                          onClick={() => navigate(`/service_details/${booking.serviceId}`)}
                        />
                      )}

                      {/* Booking Details */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <CardContent sx={{ flex: '1 0 auto', pb: 1 }}>
                          {/* Header */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box sx={{ flex: 1 }}>
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{
                                  cursor: 'pointer',
                                  '&:hover': { color: 'primary.main' }
                                }}
                                onClick={() => navigate(`/service_details/${booking.serviceId}`)}
                              >
                                {service?.serviceName || `Service #${booking.serviceId}`}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Booking ID: {booking.id}
                              </Typography>
                            </Box>
                            <Chip
                              icon={getStatusIcon(booking.status)}
                              label={booking.status}
                              color={getStatusColor(booking.status)}
                              size="small"
                            />
                          </Box>

                          <Divider sx={{ mb: 2 }} />

                          {/* Booking Info Grid */}
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <CalendarToday sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                                <Typography variant="body2">
                                  <strong>Date:</strong> {formatDate(booking.preferredDate)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <AccessTime sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                                <Typography variant="body2">
                                  <strong>Time:</strong> {formatTime(booking.preferredTime)}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Phone sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                                <Typography variant="body2">
                                  <strong>Contact:</strong> {booking.userContactNumber || 'N/A'}
                                </Typography>
                              </Box>
                              {service?.location && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <LocationOn sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                                  <Typography variant="body2" noWrap>
                                    {service.location}
                                  </Typography>
                                </Box>
                              )}
                            </Grid>
                          </Grid>

                          {/* Message */}
                          {booking.message && (
                            <Box sx={{ mt: 2, p: 1.5, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                <strong>Message:</strong> {booking.message}
                              </Typography>
                            </Box>
                          )}

                          {/* Provider Info */}
                          {booking.providerName && (
                            <Box sx={{ mt: 2, p: 1.5, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
                              <Typography variant="body2">
                                <strong>Provider:</strong> {booking.providerName}
                              </Typography>
                              {booking.providerContactNumber && (
                                <Typography variant="body2">
                                  <strong>Provider Contact:</strong> {booking.providerContactNumber}
                                </Typography>
                              )}
                            </Box>
                          )}

                          {/* Booking Date */}
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                            Booked on: {formatDate(booking.createdAt)}
                          </Typography>
                        </CardContent>

                        {/* Actions */}
                        <Box sx={{ display: 'flex', gap: 1, p: 2, pt: 0 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => navigate(`/service_details/${booking.serviceId}`)}
                          >
                            View Service
                          </Button>
                          
                          {booking.status === 'PENDING' && (
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              startIcon={<Cancel />}
                              onClick={() => handleCancelClick(booking)}
                            >
                              Cancel Booking
                            </Button>
                          )}

                          {booking.status === 'COMPLETED' && (
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => navigate(`/service_details/${booking.serviceId}`, { state: { openRatingDialog: true } })}
                            >
                              Rate Service
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Container>
      </Box>

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Cancel Booking
          <IconButton
            onClick={() => setCancelDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Are you sure you want to cancel this booking?
          </Alert>
          {selectedBooking && (
            <Box>
              <Typography variant="body2" gutterBottom>
                <strong>Service:</strong> {services[selectedBooking.serviceId]?.serviceName || `Service #${selectedBooking.serviceId}`}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Date:</strong> {formatDate(selectedBooking.preferredDate)}
              </Typography>
              <Typography variant="body2">
                <strong>Time:</strong> {formatTime(selectedBooking.preferredTime)}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>
            Keep Booking
          </Button>
          <Button
            onClick={handleCancelBooking}
            color="error"
            variant="contained"
          >
            Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookingsPage;
