import React from 'react';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './PostService.css';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Navbar from '../../components/shared/Navbar/Navbar';




const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required'),
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

    const [rateType, setRateType] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [pincode, setPincode] = useState('');
    const [services, setServices] = useState([]);
    const [serviceName, setServiceName] = useState('');
    const maxServiceNames = 10;


    const handleSubmit = (values) => {
        console.log('Form Data Submitted:', values);
    };


    const handleRateTypeChange = (event) => {
        setRateType(event.target.value);
      };

        const handleStateChange = (event) => {
        setState(event.target.value);
        };

        const handleDistrictChange = (event) => {
        setDistrict(event.target.value);
        };

        const handlePincodeChange = (event) => {
        setPincode(event.target.value);
        };

        const handleAddChip = (event) => {
            console.log("handleAddChip event",event.key);
            
            if (event.key === 'Enter' && serviceName.trim() !== '') {
                if(services.length < maxServiceNames)
                {
                    setServices([...services, serviceName.trim()]);
                    setServiceName('');
                    event.preventDefault(); 

                }
                else{
                    alert(`You can only add up to ${maxServiceNames} service names.`);  
                }
                   
            }
        };
    
        const handleDeleteChip = (chipToDelete) => () => {
            setServices(services.filter((chip) => chip !== chipToDelete));
        };


        const handlePinCodeChange =(event)=>{
            setPincode(event.target.value)
        }

    
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
        
    


    return (
        
        <div style={{display:"flex",flexDirection:"column",gap:"2rem"}}>
        
        <div>
            <Navbar></Navbar>
        </div>

        <div className="post-form-card-container">

        <Formik
    initialValues={{ service_name: '', whatsapp_number: '', pricing: '', available_services: '',location: '' }}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
>
    {({ handleChange, handleBlur, values, errors, touched }) => (
    
        <Form  >
            <Typography  style={{fontSize:"2rem",fontWeight:"200"}} gutterBottom>Post Service  </Typography>
            
            <div className='form-field-container'>

                <div className='form-row'>
                <Field
                    className='form-field'
                    name="service_name"
                    as={TextField}
                    label="Service Name"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.service_name && Boolean(errors.service_name)}
                    helperText={touched.service_name && errors.service_name}
                />
                <Field
                    className='form-field'
                    name="whatsapp_number"
                    as={TextField}
                    label="Whatsapp Number"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.whatsapp_number && Boolean(errors.whatsapp_number)}
                    helperText={touched.whatsapp_number && errors.whatsapp_number}
                />
                
                <div className='flex-row'>
                
                <Field
                    className='form-field'
                    name="pricing"
                    as={TextField}
                    label="Pricing"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.pricing && Boolean(errors.pricing)}
                    helperText={touched.pricing && errors.pricing}
                />
                

                <div style={{marginLeft:'1rem'}} >
                    <FormControl >
                      <InputLabel id="rate-type-label">Rate Type</InputLabel>
                      <Select
                        labelId="rate-type-label"
                        id="rate-type"
                        value={rateType}
                        onChange={handleRateTypeChange}
                        style={{width:'9rem'}}
                        label="Rate Type"
                      >
                   <MenuItem value=""><em>None</em></MenuItem>
                     <MenuItem value={"/hr"}>/Hr</MenuItem>
                     <MenuItem value={"/day"}>/Day</MenuItem>
                     <MenuItem value={"/service"}>/Service</MenuItem>
                      </Select>
                    </FormControl>
                </div>

                 </div>
                </div>

                <div className='form-row'>

                <div >
                    <FormControl >
                      <InputLabel id="state-lable">State</InputLabel>
                      <Select
                        labelId="state-label"
                        id="state"
                        value={state}
                        onChange={handleStateChange}
                        label="State"
                        className='form-field'
                      >
                          {states.map((name) => (
                       <MenuItem
                         key={name}
                         value={name}
                       >
                         {name}
                       </MenuItem>
                     ))}
                   
                      </Select>
                    </FormControl>
                </div>

                <div  >
                    <FormControl >
                      <InputLabel id="district-lable">District</InputLabel>
                      <Select
                        labelId="district-label"
                        id="district"
                        value={district}
                        onChange={handleDistrictChange}
                        label="District"
                        className='form-field'
                      >
                          {StateDistrictMapping['Maharashtra'].map((name) => (
                       <MenuItem
                         key={name}
                         value={name}
                       >
                         {name}
                       </MenuItem>
                     ))}
                   
                      </Select>
                    </FormControl>
                </div>

                <div >
                    <FormControl >
                      <InputLabel id="pincode-lable">Pincode</InputLabel>
                      <Select
                        labelId="pincode-label"
                        id="picode"
                        value={pincode}
                        onChange={handlePinCodeChange}
                        label="Pincode"
                        className='form-field'
                      >
                          {Pincode.map((name) => (
                       <MenuItem
                         key={name}
                         value={name}
                       >
                         {name}
                       </MenuItem>
                     ))}
                   
                      </Select>
                    </FormControl>
                </div>

                </div>
                
                <div className='form-row'>

                
                <TextField
                  id="adress"
                  label="Address..."
                  multiline
                  rows={4}
                  style={{width:'50%'}}
                />

              <TextField
                  id="outlined-multiline-static"
                  label="Service Description...."
                  multiline
                  rows={4}
                  style={{width:'50%'}}
                />


                </div>


                <div >
                    
            

        <div>
            <TextField
                label="Add services provided by you"
                variant="outlined"
                fullWidth
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                onKeyDown={handleAddChip}
            />
            <Box mt={1}>
                 {services.map((chip) => (
                <Chip
                    key={chip}
                    label={chip}
                    onDelete={handleDeleteChip(chip)}
                    style={{ margin: '4px' }}
                />
            ))}
        </Box>
        </div>

        <Button
              className='mr-top-1rem'
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Photos
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
        </Button>

                </div>

            </div>
   
        </Form>
    )}
        </Formik>

        </div>


        </div>
     
    
        
    );
}

export default PostService
