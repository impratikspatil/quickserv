import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
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
  Alert,
  Avatar
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  Phone,
  Email,
  Person,
  Close,
  CheckCircle,
  Cancel,
  HourglassEmpty,
  Message as MessageIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseURL from '../../config';
import Navbar from '../../components/shared/Navbar/Navbar';
import { toast } from 'react-toastify';
import './ProviderBookingsPage.css';

const ProviderBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionType, setActionType] = useState(''); // 'accept', 'reject', 'complete'
  const navigate = useNavigate();

  useEffect(() => {
    fetchProviderBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [activeTab, bookings]);

  const fetchProviderBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to view bookings');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get(`${BaseURL}api/bookings/provider-bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching provider bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;
    
    switch (activeTab) {
      case 1: // Pending
        filtered = bookings.filter(b => b.status === 'PENDING');
        break;
      case 2: // Confirmed
        filtered = bookings.filter(b => b.status === 'CONFIRMED');
        break;
      case 3: // Completed
        filtered = bookings.filter(b => b.status === 'COMPLETED');
        break;
      case 4: // Cancelled
        filtered = bookings.filter(b => b.status === 'CANCELLED');
        break;
      default: // All
        filtered = bookings;
    }
    
    setFilteredBookings(filtered);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleActionClick = (booking, action) => {
    setSelectedBooking(booking);
    setActionType(action);
    setActionDialogOpen(true);
  };

  const handleActionConfirm = async () => {
    if (!selectedBooking) return;

    const token = localStorage.getItem('token');
    let newStatus = '';

    switch (actionType) {
      case 'accept':
        newStatus = 'CONFIRMED';
        break;
      case 'reject':
        newStatus = 'CANCELLED';
        break;
      case 'complete':
        newStatus = 'COMPLETED';
        break;
      default:
        return;
    }

    try {
      await axios.put(
        `${BaseURL}api/bookings/${selectedBooking.bookingId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Booking ${actionType}ed successfully!`);
      setActionDialogOpen(false);
      setSelectedBooking(null);
      fetchProviderBookings(); // Refresh
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error(error.response?.data || 'Failed to update booking');
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING':
        return <HourglassEmpty />;
      case 'CONFIRMED':
        return <CheckCircle />;
      case 'COMPLETED':
        return <CheckCircle />;
      case 'CANCELLED':
        return <Cancel />;
      default:
        return null;
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
      <Box className="provider-bookings-page" sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', pt: 3, pb: 6 }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" fontWeight="700" gutterBottom sx={{ fontSize: '1.5rem' }}>
              Booking Requests
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              Manage bookings for your services
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
              <Tab label={`All (${bookings.length})`} sx={{ textTransform: 'none', fontSize: '0.875rem' }} />
              <Tab label={`Pending (${bookings.filter(b => b.status === 'PENDING').length})`} sx={{ textTransform: 'none', fontSize: '0.875rem' }} />
              <Tab label={`Confirmed (${bookings.filter(b => b.status === 'CONFIRMED').length})`} sx={{ textTransform: 'none', fontSize: '0.875rem' }} />
              <Tab label={`Completed (${bookings.filter(b => b.status === 'COMPLETED').length})`} sx={{ textTransform: 'none', fontSize: '0.875rem' }} />
              <Tab label={`Cancelled (${bookings.filter(b => b.status === 'CANCELLED').length})`} sx={{ textTransform: 'none', fontSize: '0.875rem' }} />
            </Tabs>
          </Paper>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No bookings found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activeTab === 0 
                  ? "You haven't received any booking requests yet" 
                  : `No ${['all', 'pending', 'confirmed', 'completed', 'cancelled'][activeTab]} bookings`}
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={2.5}>
              {filteredBookings.map((booking) => (
                <Grid item xs={12} key={booking.bookingId}>
                  <Card 
                    className="booking-card"
                    sx={{ 
                      border: '1px solid #e8e8e8',
                      borderRadius: '10px',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Grid container spacing={2}>
                        {/* Left: Service & Customer Info */}
                        <Grid item xs={12} md={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Avatar sx={{ bgcolor: '#ff9800', width: 48, height: 48 }}>
                              <Person />
                            </Avatar>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1.1rem', mb: 0.5 }}>
                                {booking.serviceName}
                              </Typography>
                              <Chip 
                                icon={getStatusIcon(booking.status)}
                                label={booking.status} 
                                color={getStatusColor(booking.status)}
                                size="small"
                                sx={{ height: 24, fontSize: '0.75rem', fontWeight: 500 }}
                              />
                            </Box>
                          </Box>

                          <Divider sx={{ my: 1.5 }} />

                          {/* Customer Details */}
                          <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1, fontSize: '0.875rem' }}>
                            Customer Details:
                          </Typography>
                          
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Person sx={{ fontSize: 18, color: '#757575' }} />
                              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                {booking.userName}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Email sx={{ fontSize: 18, color: '#757575' }} />
                              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                {booking.userEmail}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Phone sx={{ fontSize: 18, color: '#757575' }} />
                              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                {booking.userPhone || 'Not provided'}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>

                        {/* Right: Booking Details & Actions */}
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1, fontSize: '0.875rem' }}>
                            Booking Details:
                          </Typography>
                          
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CalendarToday sx={{ fontSize: 18, color: '#757575' }} />
                              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                {formatDate(booking.preferredDate)}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <AccessTime sx={{ fontSize: 18, color: '#757575' }} />
                              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                {formatTime(booking.preferredTime)}
                              </Typography>
                            </Box>
                          </Box>

                          {booking.message && (
                            <Box sx={{ mb: 2, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                                <MessageIcon sx={{ fontSize: 16, color: '#757575' }} />
                                <Typography variant="caption" fontWeight="600" color="text.secondary">
                                  Customer Message:
                                </Typography>
                              </Box>
                              <Typography variant="body2" sx={{ fontSize: '0.813rem', color: 'text.secondary' }}>
                                {booking.message}
                              </Typography>
                            </Box>
                          )}

                          {/* Action Buttons */}
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                            {booking.status === 'PENDING' && (
                              <>
                                <Button
                                  variant="contained"
                                  size="small"
                                  startIcon={<CheckCircle sx={{ fontSize: 18 }} />}
                                  onClick={() => handleActionClick(booking, 'accept')}
                                  sx={{
                                    bgcolor: '#4caf50',
                                    '&:hover': { bgcolor: '#45a049' },
                                    textTransform: 'none',
                                    fontSize: '0.813rem',
                                    px: 2,
                                    boxShadow: 'none'
                                  }}
                                >
                                  Accept
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="error"
                                  startIcon={<Cancel sx={{ fontSize: 18 }} />}
                                  onClick={() => handleActionClick(booking, 'reject')}
                                  sx={{
                                    textTransform: 'none',
                                    fontSize: '0.813rem',
                                    px: 2
                                  }}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            
                            {booking.status === 'CONFIRMED' && (
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<CheckCircle sx={{ fontSize: 18 }} />}
                                onClick={() => handleActionClick(booking, 'complete')}
                                sx={{
                                  bgcolor: '#ff9800',
                                  '&:hover': { bgcolor: '#f57c00' },
                                  textTransform: 'none',
                                  fontSize: '0.813rem',
                                  px: 2,
                                  boxShadow: 'none'
                                }}
                              >
                                Mark as Completed
                              </Button>
                            )}

                            {(booking.status === 'COMPLETED' || booking.status === 'CANCELLED') && (
                              <Chip 
                                label={`Booking ${booking.status.toLowerCase()}`}
                                color={getStatusColor(booking.status)}
                                size="small"
                                sx={{ fontSize: '0.813rem' }}
                              />
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* Action Confirmation Dialog */}
      <Dialog open={actionDialogOpen} onClose={() => setActionDialogOpen(false)}>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Confirm Action
            <IconButton onClick={() => setActionDialogOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Alert 
            severity={actionType === 'reject' ? 'warning' : 'info'}
            sx={{ mb: 2 }}
          >
            {actionType === 'accept' && 'The customer will be notified that you accepted their booking.'}
            {actionType === 'reject' && 'The customer will be notified that their booking was cancelled.'}
            {actionType === 'complete' && 'Mark this booking as completed. The customer can rate your service.'}
          </Alert>
          <Typography>
            Are you sure you want to <strong>{actionType}</strong> the booking for <strong>{selectedBooking?.serviceName}</strong> by <strong>{selectedBooking?.userName}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleActionConfirm} 
            variant="contained"
            color={actionType === 'reject' ? 'error' : 'primary'}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProviderBookingsPage;
