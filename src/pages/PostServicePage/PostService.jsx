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
    .required('Image is required')
    .test('fileSize', 'File too large', value => !value || (value && value.size <= 5 * 1024 * 1024)) // 5MB
    .test('fileType', 'Unsupported File Format', value => !value || (value && ['image/jpeg', 'image/png'].includes(value.type))),

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

const PostService = () => {
  // const [rateType, setRateType] = useState('');
  // const [state, setState] = useState('');
  // const [district, setDistrict] = useState('');
  // const [pincode, setPincode] = useState('');
  // const [tags, setTags] = useState([]);
  const [serviceName, setServiceName] = useState('');
  // const [serviceCategory, setServiceCategory] = useState('');
  const [serviceCategories, setServiceCategories] = useState([]);
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




  const AddNewService = async (formData) => {

    try {
      const response = await axios.post(
        BaseURL+'/api/services/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("add new service response:", response.data);

      setTimeout(() => {
        setWaitingCardVisibility(false);
        setSuccessCardMsg("Service Added Successfully");
        setSuccessCardVisibility(true);
      }, 2000);
    } catch (err) {
      
      console.error("Failed to add service:", err);
    
      setTimeout(() => {
        setWaitingCardVisibility(false);
        setErrorCardMsg("Failed to Add Service");
        setErrorCardVisibility(true);
      }, 2000);
    }
  };

  const handleSubmit = (data) => {
    setWaitingCardMsg("Adding Service Please Wait...");
    setWaitingCardVisibility(true);
    const formData = new FormData();

    let categoryId = serviceCategories.find((item) => item.categoryName == data.serviceCategory).categoryId

    const maxServerId = AllServicesData.length > 0
      ? Math.max(...AllServicesData.map(service => service.serviceId))
      : 0;
    const nextServiceId = maxServerId + 1;

    formData.append("serviceId", nextServiceId);
    formData.append("whatsappNumber", data.whatsappNumber);
    formData.append("serviceName", data.serviceName);
    formData.append("description", data.description);
    formData.append("serviceCategory", data.serviceCategory);
    formData.append("price", parseFloat(data.pricing));
    formData.append("state", data.state);
    formData.append("district", data.district);
    formData.append("pincode", data.pincode);
    formData.append("address", data.address);
    formData.append("rateType", data.rateType);
    formData.append("rating", "");
    formData.append("location", "");
    formData.append("categoryId", parseInt(categoryId));
    formData.append("isVerified", false);
    formData.append("rateCount", 0);

    // Add tags
    data.tags.forEach(tag => {
      formData.append("tags", tag);
    });

    // Add the image file
    if (data.image) {
      formData.append("image", data.image);
    }

    AddNewService(formData);
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


  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Chandigarh", // Union Territory
    "Dadra and Nagar Haveli and Daman and Diu", // Union Territory
    "Delhi", // National Capital Territory
    "Puducherry", // Union Territory
    "Andaman and Nicobar Islands", // Union Territory
  ];

  const StateDistrictMapping = {
    "Maharashtra": [
      "Ahmednagar",
      "Akola",
      "Amravati",
      "Aurangabad",
      "Beed",
      "Bhandara",
      "Buldhana",
      "Chandrapur",
      "Dhule",
      "Gadchiroli",
      "Gondia",
      "Hingoli",
      "Jalgaon",
      "Jalna",
      "Kolhapur",
      "Latur",
      "Mumbai City",
      "Mumbai Suburban",
      "Nagpur",
      "Nanded",
      "Nandurbar",
      "Nashik",
      "Osmanabad",
      "Palghar",
      "Parbhani",
      "Pune",
      "Raigad",
      "Ratnagiri",
      "Sangli",
      "Satara",
      "Sindhudurg",
      "Solapur",
      "Thane",
      "Wardha",
      "Washim",
      "Yavatmal"
    ]
  };

  const Pincode = [
    "400001",
    "400002",
    "400003",
    "400004",
    "400005",
    "400006",
    "400007",

  ];

  useEffect(() => {
    axios.get(BaseURL+'/api/category')
      .then(response => {

        let data = response.data
        // console.log("response.date",data);

        setServiceCategories(data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);


  useEffect(() => {
    axios.get(BaseURL+'/api/services')
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
                        handleChange(e);
                        setFieldValue('district', ''); // reset district when state changes
                      }}
                      error={touched.state && Boolean(errors.state)}
                    >
                      {states.map((name) => (
                        <MenuItem key={name} value={name}>{name}</MenuItem>
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
                    >
                      {(StateDistrictMapping[values.state] || []).map((name) => (
                        <MenuItem key={name} value={name}>{name}</MenuItem>
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
                      Upload Image
                      <VisuallyHiddenInput
                        type="file"   
                        accept="image/*"
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