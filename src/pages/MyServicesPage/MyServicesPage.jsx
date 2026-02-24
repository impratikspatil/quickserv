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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Alert,
  Paper
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  LocationOn,
  Star,
  Verified,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseURL from '../../config';
import Navbar from '../../components/shared/Navbar/Navbar';
import { toast } from 'react-toastify';
import './MyServicesPage.css';
import { category_list } from '../../assets/assets';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const MyServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  // Edit form state
  const [editForm, setEditForm] = useState({
    serviceName: '',
    whatsappNumber: '',
    description: '',
    serviceCategory: '',
    price: '',
    state: '',
    district: '',
    pincode: '',
    address: '',
    rateType: '',
    location: '',
    tags: [],
    categoryId: ''
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    fetchMyServices();
  }, []);

  const fetchMyServices = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to view your services');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get(`${BaseURL}api/services/my-services`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching my services:', error);
      toast.error('Failed to load your services');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (service) => {
    setSelectedService(service);
    setEditForm({
      serviceName: service.serviceName || '',
      whatsappNumber: service.whatsappNumber || '',
      description: service.description || '',
      serviceCategory: service.serviceCategory || '',
      price: service.price || '',
      state: service.state || '',
      district: service.district || '',
      pincode: service.pincode || '',
      address: service.address || '',
      rateType: service.rateType || '',
      location: service.location || '',
      tags: service.tags || [],
      categoryId: service.categoryId || ''
    });
    setImagePreview(service.imageUrl || '');
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (service) => {
    setSelectedService(service);
    setDeleteDialogOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size must be less than 2MB');
        return;
      }
      // Validate file type
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        toast.error('Only JPEG and PNG images are allowed');
        return;
      }

      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !editForm.tags.includes(tagInput.trim())) {
      setEditForm({
        ...editForm,
        tags: [...editForm.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setEditForm({
      ...editForm,
      tags: editForm.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleUpdateService = async () => {
    if (!selectedService) return;

    const token = localStorage.getItem('token');
    setUpdating(true);

    try {
      const formData = new FormData();
      formData.append('serviceName', editForm.serviceName);
      formData.append('whatsappNumber', editForm.whatsappNumber);
      formData.append('description', editForm.description);
      formData.append('serviceCategory', editForm.serviceCategory);
      formData.append('price', editForm.price);
      formData.append('state', editForm.state);
      formData.append('district', editForm.district);
      formData.append('pincode', editForm.pincode);
      formData.append('address', editForm.address);
      formData.append('rateType', editForm.rateType);
      formData.append('location', editForm.location);
      formData.append('categoryId', editForm.categoryId);
      
      // Append tags as individual items
      editForm.tags.forEach(tag => {
        formData.append('tags', tag);
      });

      // Append image if new one selected
      if (newImage) {
        formData.append('image', newImage);
      }

      const response = await axios.put(
        `${BaseURL}api/services/update/${selectedService.serviceId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Service updated successfully!');
      setEditDialogOpen(false);
      setNewImage(null);
      setImagePreview('');
      fetchMyServices(); // Refresh the list
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error(error.response?.data || 'Failed to update service');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteService = async () => {
    if (!selectedService) return;

    const token = localStorage.getItem('token');

    try {
      await axios.delete(
        `${BaseURL}api/services/delete/${selectedService.serviceId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success('Service deleted successfully!');
      setDeleteDialogOpen(false);
      setSelectedService(null);
      fetchMyServices(); // Refresh the list
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error(error.response?.data || 'Failed to delete service');
    }
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
      <Box className="my-services-page" sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', pt: 3, pb: 6 }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h5" fontWeight="700" gutterBottom sx={{ fontSize: '1.5rem', mb: 0.5 }}>
                My Services
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                Manage all your posted services
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/post_service')}
              sx={{
                backgroundColor: '#ff9800',
                textTransform: 'none',
                px: 2.5,
                py: 1,
                fontSize: '0.875rem',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#f57c00',
                  boxShadow: '0 2px 8px rgba(255,152,0,0.3)'
                }
              }}
            >
              Post New Service
            </Button>
          </Box>

          {/* Services Grid */}
          {services.length === 0 ? (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No services posted yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Start by posting your first service!
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/post_service')}
              >
                Post Service
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={2.5}>
              {services.map((service) => (
                <Grid item xs={12} key={service.serviceId}>
                  <Card 
                    className="service-card" 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      overflow: 'hidden',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                      }
                    }}
                  >
                    {/* Service Image */}
                    <CardMedia
                      component="img"
                      sx={{ 
                        width: { xs: '100%', sm: 220 },
                        height: { xs: 180, sm: 'auto' },
                        objectFit: 'cover',
                        minHeight: { sm: 200 }
                      }}
                      image={service.imageUrl || 'https://via.placeholder.com/220x200?text=No+Image'}
                      alt={service.serviceName}
                    />
                    
                    {/* Service Details */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <CardContent sx={{ flexGrow: 1, p: 2.5, pb: 1.5 }}>
                        {/* Title & Verified Badge */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                          <Typography 
                            variant="h6" 
                            fontWeight="600" 
                            sx={{ 
                              flexGrow: 1,
                              fontSize: '1.15rem',
                              lineHeight: 1.3
                            }}
                          >
                            {service.serviceName}
                          </Typography>
                          {service.isVerified && (
                            <Chip 
                              icon={<Verified sx={{ fontSize: 14 }} />} 
                              label="Verified" 
                              size="small" 
                              sx={{ 
                                height: 24,
                                bgcolor: '#e8f5e9',
                                color: '#2e7d32',
                                fontWeight: 500,
                                fontSize: '0.75rem'
                              }}
                            />
                          )}
                        </Box>

                        {/* Rating & Location Row */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, mb: 1.25 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Star sx={{ color: '#ff9800', fontSize: 18 }} />
                            <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.875rem' }}>
                              {service.rating || '0'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.813rem' }}>
                              ({service.rateCount || 0})
                            </Typography>
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LocationOn sx={{ color: '#9e9e9e', fontSize: 18 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                              {service.location || service.address}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Price */}
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 1.25 }}>
                          <Typography 
                            component="span"
                            sx={{ 
                              color: '#ff9800',
                              fontSize: '1.05rem',
                              fontWeight: 700,
                              lineHeight: 1
                            }}
                          >
                            ₹{service.price}
                          </Typography>
                          <Typography 
                            component="span"
                            sx={{ 
                              color: 'text.secondary',
                              fontSize: '0.813rem',
                              fontWeight: 400
                            }}
                          >
                            per {service.rateType}
                          </Typography>
                        </Box>

                        {/* Description */}
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ 
                            mb: 1.5, 
                            lineHeight: 1.5,
                            fontSize: '0.875rem'
                          }}
                        >
                          {service.description?.substring(0, 120)}
                          {service.description?.length > 120 && '...'}
                        </Typography>

                        {/* Tags */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                          {service.tags?.slice(0, 4).map((tag, index) => (
                            <Chip 
                              key={index} 
                              label={tag} 
                              size="small"
                              sx={{ 
                                bgcolor: '#f5f5f5',
                                height: 26,
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                '&:hover': { bgcolor: '#eeeeee' }
                              }}
                            />
                          ))}
                        </Box>
                      </CardContent>

                      {/* Action Buttons */}
                      <Box sx={{ 
                        p: 2, 
                        pt: 1.5, 
                        display: 'flex', 
                        gap: 1.5,
                        borderTop: '1px solid #f0f0f0'
                      }}>
                        <Button
                          variant="contained"
                          startIcon={<EditIcon sx={{ fontSize: 18 }} />}
                          onClick={() => handleEditClick(service)}
                          size="medium"
                          sx={{
                            bgcolor: '#ff9800',
                            '&:hover': { bgcolor: '#f57c00' },
                            textTransform: 'none',
                            px: 2.5,
                            py: 0.75,
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            boxShadow: 'none'
                          }}
                        >
                          Edit Service
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon sx={{ fontSize: 18 }} />}
                          onClick={() => handleDeleteClick(service)}
                          size="medium"
                          sx={{ 
                            textTransform: 'none',
                            px: 2.5,
                            py: 0.75,
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            borderWidth: 1.5
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* Edit Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => !updating && setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Edit Service
            <IconButton onClick={() => setEditDialogOpen(false)} disabled={updating}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Image Upload */}
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px', borderRadius: '8px' }}
                  />
                )}
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                >
                  {newImage ? 'Change Image' : 'Upload New Image'}
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handleImageChange}
                  />
                </Button>
              </Box>
            </Grid>

            {/* Service Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Service Name"
                value={editForm.serviceName}
                onChange={(e) => setEditForm({...editForm, serviceName: e.target.value})}
                required
              />
            </Grid>

            {/* WhatsApp Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="WhatsApp Number"
                value={editForm.whatsappNumber}
                onChange={(e) => setEditForm({...editForm, whatsappNumber: e.target.value})}
                required
              />
            </Grid>

            {/* Service Category */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Service Category</InputLabel>
                <Select
                  value={editForm.serviceCategory}
                  onChange={(e) => {
                    const selectedCat = category_list.find(cat => cat.category_name === e.target.value);
                    setEditForm({
                      ...editForm, 
                      serviceCategory: e.target.value,
                      categoryId: selectedCat ? selectedCat.category_id : ''
                    });
                  }}
                  label="Service Category"
                >
                  {category_list.map((cat) => (
                    <MenuItem key={cat.category_id} value={cat.category_name}>
                      {cat.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Price */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={editForm.price}
                onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                required
              />
            </Grid>

            {/* Rate Type */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Rate Type</InputLabel>
                <Select
                  value={editForm.rateType}
                  onChange={(e) => setEditForm({...editForm, rateType: e.target.value})}
                  label="Rate Type"
                >
                  <MenuItem value="hour">Per Hour</MenuItem>
                  <MenuItem value="day">Per Day</MenuItem>
                  <MenuItem value="service">Per Service</MenuItem>
                  <MenuItem value="project">Per Project</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* State */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                value={editForm.state}
                onChange={(e) => setEditForm({...editForm, state: e.target.value})}
                required
              />
            </Grid>

            {/* District */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="District"
                value={editForm.district}
                onChange={(e) => setEditForm({...editForm, district: e.target.value})}
                required
              />
            </Grid>

            {/* Pincode */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pincode"
                value={editForm.pincode}
                onChange={(e) => setEditForm({...editForm, pincode: e.target.value})}
                required
              />
            </Grid>

            {/* Location */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={editForm.location}
                onChange={(e) => setEditForm({...editForm, location: e.target.value})}
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                value={editForm.address}
                onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                required
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={editForm.description}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                required
              />
            </Grid>

            {/* Tags */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  label="Add Tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                />
                <Button variant="outlined" onClick={handleAddTag}>Add</Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {editForm.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} disabled={updating}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpdateService} 
            variant="contained" 
            disabled={updating}
          >
            {updating ? <CircularProgress size={24} /> : 'Update Service'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            This action cannot be undone!
          </Alert>
          <Typography>
            Are you sure you want to delete "{selectedService?.serviceName}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteService} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyServicesPage;
