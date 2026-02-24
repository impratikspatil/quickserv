import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Navbar from '../../components/shared/Navbar/Navbar';
import axios from 'axios';
import './PostService.css';
import ErrorCard from '../../components/shared/NotifyCard/ErrorCard/errorcard';
import SuccessCard from '../../components/shared/NotifyCard/SuccessCard/sucesscard';
import WaitingCard from '../../components/shared/NotifyCard/WaitingCard/waitingcard';
import WarningCard from '../../components/shared/NotifyCard/WarningCard/warningcard';
import BaseURL from '../../config';
import { category_list } from '../../assets/assets';
import statesDistrictsData from '../../data/indiaStatesDistricts.json';

const validationSchema = Yup.object().shape({
  serviceName: Yup.string().required('Service Name is required'),
  whatsappNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'WhatsApp number must be exactly 10 digits')
    .required('WhatsApp Number is required'),
  pricing: Yup.string()
    .matches(/^\d+$/, 'Pricing must be a number')
    .required('Pricing is required'),
  rateType: Yup.string().required('Rate Type required'),
  state: Yup.string().required('State is required'),
  district: Yup.string().required('District is required'),
  pincode: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, 'Invalid pincode')
    .required('Pincode is required'),
  serviceCategory: Yup.string().required('Service Category is required'),
  address: Yup.string().required('Address is required'),
  description: Yup.string().required('Service Description is required'),
  tags: Yup.array().min(1, 'Service tags are required'),
  image: Yup.mixed()
    .nullable()
    .test('fileSize', 'File too large. Maximum size is 2MB', value => !value || (value && value.size <= 2 * 1024 * 1024)) // 2MB
    .test('fileType', 'Unsupported File Format. Only JPEG and PNG are allowed', value => !value || (value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))),

});

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

// Map static categories to match API format (categoryName instead of category_name)
const mapStaticCategories = () => {
  return category_list.map((cat, index) => ({
    categoryName: cat.category_name,
    categoryId: `static_${index + 1}`, // Temporary ID for static categories
    categoryIcon: cat.category_icon
  }));
};

const PostService = () => {
  // const [rateType, setRateType] = useState('');
  // const [state, setState] = useState('');
  // const [district, setDistrict] = useState('');
  // const [pincode, setPincode] = useState('');
  // const [tags, setTags] = useState([]);
  const [serviceName, setServiceName] = useState('');
  // const [serviceCategory, setServiceCategory] = useState('');
  
  // Initialize with static categories
  const [serviceCategories, setServiceCategories] = useState(mapStaticCategories());
  const [AllServicesData, setAllServicesData] = useState([]);
  const [errorCardVisibility, setErrorCardVisibility] = useState(false);
  const [successCardVisibility, setSuccessCardVisibility] = useState(false);
  const [warningCardVisibility, setWarningCardVisibility] = useState(false);
  const [waitingCardVisibility, setWaitingCardVisibility] = useState(false);
  const [errorCardMsg, setErrorCardMsg] = useState('');
  const [successCardMsg, setSuccessCardMsg] = useState('');
  const [warningCardMsg, setWarningCardMsg] = useState('');
  const [waitingCardMsg, setWaitingCardMsg] = useState('');
  const maxServiceNames = 10;

  const token = localStorage.getItem('token');
  
  // Geolocation states
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationData, setLocationData] = useState({ latitude: null, longitude: null, city: null });

  // Get states and districts from JSON
  const states = Object.keys(statesDistrictsData);
  const [districts, setDistricts] = useState([]);

  // Update districts when state changes
  const handleStateChange = (stateName, setFieldValue) => {
    setFieldValue('state', stateName);
    setFieldValue('district', ''); // Reset district when state changes
    
    if (stateName) {
      setDistricts(statesDistrictsData[stateName] || []);
    } else {
      setDistricts([]);
    }
  };




  const AddNewService = async (serviceData, imageFile) => {
    const token = localStorage.getItem('token');

    try {
      // Create FormData to send multipart/form-data
      const formData = new FormData();

      // Append all text fields from serviceData
      Object.keys(serviceData).forEach(key => {
        formData.append(key, serviceData[key]);
      });

      // Append the actual physical file object if it exists
      if (imageFile) {
        formData.append('image', imageFile); // 'image' matches @RequestParam("image") in Java
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          // IMPORTANT: Do NOT set 'Content-Type'. Axios/Browser handles it for FormData.
        }
      };

      const response = await axios.post(
        BaseURL + 'api/services/create',
        formData,
        config
      );

      setWaitingCardVisibility(false);
      setSuccessCardMsg("Service Added Successfully");
      setSuccessCardVisibility(true);
      
    } catch (err) {
      console.error("Failed to add service:", err);
      setWaitingCardVisibility(false);
      setErrorCardMsg(err.response?.data?.message || "Failed to Add Service");
      setErrorCardVisibility(true);
    }
  };

  const handleSubmit = async (data) => {
    setWaitingCardMsg("Adding Service Please Wait...");
    setWaitingCardVisibility(true);

    const selectedCategory = serviceCategories.find((item) => item.categoryName == data.serviceCategory);
    let categoryId = selectedCategory?.categoryId;
    
    if (categoryId && typeof categoryId === 'string' && categoryId.startsWith('static_')) {
      categoryId = parseInt(categoryId.replace('static_', '')) || 0;
    }
    categoryId = categoryId ? parseInt(categoryId) : 0;

    const maxServerId = AllServicesData.length > 0
      ? Math.max(...AllServicesData.map(service => service.serviceId))
      : 0;

    // This is the text-data object
    const serviceData = {
      serviceId: maxServerId + 1,
      whatsappNumber: data.whatsappNumber,
      serviceName: data.serviceName,
      description: data.description,
      serviceCategory: data.serviceCategory,
      price: parseFloat(data.pricing),
      state: data.state,
      district: data.district,
      pincode: data.pincode,
      address: data.address,
      rateType: data.rateType,
      rating: 0,
      location: data.address || "",
      categoryId: categoryId,
      isVerified: false,
      rateCount: 0,
      tags: data.tags.join(","),
      // Include geolocation data if available
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      city: locationData.city || data.district
    };

    // Send the text data AND the raw file object
    AddNewService(serviceData, data.image);
  };

  // Detect user's current location
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setWarningCardMsg('Geolocation is not supported by your browser');
      setWarningCardVisibility(true);
      setTimeout(() => setWarningCardVisibility(false), 3000);
      return;
    }

    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Try to get city name using reverse geocoding (optional)
        try {
          // For now, just store coordinates
          setLocationData({ latitude, longitude, city: null });
          setSuccessCardMsg('Location detected! Coordinates will be saved with your service.');
          setSuccessCardVisibility(true);
          setTimeout(() => setSuccessCardVisibility(false), 3000);
        } catch (error) {
          console.error('Error with geocoding:', error);
          setLocationData({ latitude, longitude, city: null });
        } finally {
          setDetectingLocation(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setWarningCardMsg('Could not get your location. Please enable location access.');
        setWarningCardVisibility(true);
        setTimeout(() => setWarningCardVisibility(false), 3000);
        setDetectingLocation(false);
      }
    );
  };

  const handleAddChip = (event, values, setFieldValue) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (serviceName.trim() !== '') {
        if (values.tags.length < maxServiceNames) {
          setFieldValue('tags', [...values.tags, serviceName.trim()]);
          setServiceName('');
        } else {
          alert(`You can only add up to ${maxServiceNames} service names.`);
        }
      }
    }
  };


  const handleDeleteChip = (chipToDelete, values, setFieldValue) => () => {
    const updatedTags = values.tags.filter(tag => tag !== chipToDelete);
    setFieldValue('tags', updatedTags);
  };

  useEffect(() => {
    axios.get(BaseURL+'api/category',{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        let data = response.data
        console.log("response.data of service categories", data);

        // Check if API returned data and it's not empty
        if (data && Array.isArray(data) && data.length > 0) {
          setServiceCategories(data);
        } else {
          // API returned empty array - use static categories
          console.log('No categories from API, using static categories');
          setServiceCategories(mapStaticCategories());
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        // On error, use static categories as fallback
        console.log('Using static categories as fallback');
        setServiceCategories(mapStaticCategories());
      });
  }, []);


  useEffect(() => {
    axios.get(BaseURL+'api/services',{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {

        let data = response.data

        setAllServicesData(data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const onClose = () => {
    setErrorCardVisibility(false);
    setSuccessCardVisibility(false);
    setWarningCardVisibility(false);
    setWaitingCardVisibility(false);
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Navbar />
      <div className="post-form-card-container">
        {errorCardVisibility && <ErrorCard msg={errorCardMsg} onClose={onClose}/>}
        {successCardVisibility && <SuccessCard msg={successCardMsg} onClose={onClose}/>}
        {warningCardVisibility && <WarningCard msg={warningCardMsg} onClose={onClose}/>}
        {waitingCardVisibility && <WaitingCard msg={waitingCardMsg} onClose={onClose}/>}
        
        <Formik
          initialValues={{
            serviceName: '',
            whatsappNumber: '',
            pricing: '',
            address: '',
            description: '',
            rateType: '',
            state: '',
            district: '',
            pincode: '',
            serviceCategory: '',
            tags: [],
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
            <Form>
              <Typography variant="h4" gutterBottom>Post Your Service</Typography>

              <div className='form-field-container'>
                <div className='form-row'>
                  <Field
                    name="serviceName"
                    as={TextField}
                    label="Service Name"
                    variant="outlined"
                    fullWidth
                    error={touched.serviceName && Boolean(errors.serviceName)}
                    helperText={touched.serviceName && errors.serviceName}
                  />

                  <Field
                    name="whatsappNumber"
                    as={TextField}
                    label="Whatsapp Number"
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 10 }}
                    error={touched.whatsappNumber && Boolean(errors.whatsappNumber)}
                    helperText={touched.whatsappNumber && errors.whatsappNumber}
                  />
                </div>

                <div className='form-row'>
                  <Field
                    name="pricing"
                    as={TextField}
                    label="Pricing (INR) "
                    variant="outlined"
                    fullWidth
                    error={touched.pricing && Boolean(errors.pricing)}
                    helperText={touched.pricing && errors.pricing}
                  />

                  <FormControl fullWidth>
                    <InputLabel>Rate Type</InputLabel>
                    <Field
                      name="rateType"
                      as={Select}
                      label="Rate Type"
                      error={touched.rateType && Boolean(errors.rateType)}
                    >
                      <MenuItem value="/hr">/Hr</MenuItem>
                      <MenuItem value="/day">/Day</MenuItem>
                      <MenuItem value="/service">/Service</MenuItem>
                    </Field>
                    <ErrorMessage name="rateType" component="div" className="error-message warning-msg" />
                  </FormControl>
                </div>

                <div className='form-row'>
                  <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Field
                      name="state"
                      as={Select}
                      label="State"
                      onChange={(e) => {
                        handleStateChange(e.target.value, setFieldValue);
                      }}
                      error={touched.state && Boolean(errors.state)}
                    >
                      {states.map((stateName) => (
                        <MenuItem key={stateName} value={stateName}>{stateName}</MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage name="state" component="div" className="error-message warning-msg" />
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>District</InputLabel>
                    <Field
                      name="district"
                      as={Select}
                      label="District"
                      error={touched.district && Boolean(errors.district)}
                      disabled={!values.state || districts.length === 0}
                    >
                      {districts.map((districtName) => (
                        <MenuItem key={districtName} value={districtName}>{districtName}</MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage name="district" component="div" className="error-message warning-msg" />
                  </FormControl>

                  <FormControl fullWidth>
                    <Field
                      name="pincode"
                      as={TextField}
                      label="Pincode"
                      variant="outlined"
                      error={touched.pincode && Boolean(errors.pincode)}
                      helperText={<ErrorMessage name="pincode" />}
                      inputProps={{ maxLength: 6 }}
                    />
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Service Category</InputLabel>
                    <Field
                      name="serviceCategory"
                      as={Select}
                      label="Service Category"
                      error={touched.serviceCategory && Boolean(errors.serviceCategory)}
                    >
                      {serviceCategories.map((cat) => (
                        <MenuItem key={cat.categoryName} value={cat.categoryName}>{cat.categoryName}</MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage name="serviceCategory" component="div" className="error-message warning-msg" />
                  </FormControl>
                </div>

                <div className='form-row'>
                  <Field
                    name="address"
                    as={TextField}
                    label="Address"
                    multiline
                    rows={2}
                    fullWidth
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />

                  <Field
                    name="description"
                    as={TextField}
                    label="Service Description"
                    multiline
                    rows={2}
                    fullWidth
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </div>

                {/* Location Detection Button */}
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleDetectLocation}
                    disabled={detectingLocation}
                    startIcon={detectingLocation ? <CircularProgress size={16} /> : null}
                    sx={{
                      textTransform: 'none',
                      color: '#ff9800',
                      borderColor: '#ff9800',
                      '&:hover': {
                        borderColor: '#f57c00',
                        backgroundColor: 'rgba(255, 152, 0, 0.04)'
                      }
                    }}
                  >
                    {detectingLocation ? 'Detecting...' : 'Detect My Location (for Near Me feature)'}
                  </Button>
                  {locationData.latitude && (
                    <Chip 
                      label="✓ Location detected" 
                      color="success" 
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  )}
                </Box>

                <div className='form-row'>
                  <TextField
                    label="Add services provided by you"
                    variant="outlined"
                    fullWidth
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    onKeyDown={(e) => handleAddChip(e, values, setFieldValue)}
                    error={Boolean(touched.tags && errors.tags)}
                    helperText={touched.tags && errors.tags}
                  />
                </div>

                <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                  {values.tags.map((chip) => (
                    <Chip
                      key={chip}
                      label={chip}
                      onDelete={() => handleDeleteChip(chip, values, setFieldValue)}
                    />
                  ))}
                </Box>

                <div className="button-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <Box>
                    {values.image && (
                      <Typography className="selected-file-text">
                        Selected: {values.image.name}
                      </Typography>
                    )}
                    <Button
                      component="label"
                      className="upload-button"
                      startIcon={<CloudUploadIcon />}
                      sx={{
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        '&:hover': {
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                          transform: 'translateY(-1px)'
                        },
                        transition: 'all 0.2s ease-in-out'
                      }}
                    >
                      Upload Image (Optional)
                      <VisuallyHiddenInput
                        type="file"   
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={(event) => { 
                          setFieldValue('image', event.currentTarget.files[0]);
                        }}
                      />
                    </Button>
                    {touched.image && errors.image && (
                      <div className="warning-msg">{errors.image}</div>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                      type="reset" 
                      variant="outlined" 
                      color="primary" 
                      size="large"
                    >
                      Reset
                    </Button>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary" 
                      size="large"
                    >
                      Submit
                    </Button>
                  </Box>
                </div>
                </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PostService;