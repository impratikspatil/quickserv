import React, { useState } from 'react';
import List from '@mui/material/List';
import theme from '../../theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import GlobalSearchFilter from '../../components/shared/filters/GlobalSearchFilter';
import LocationFilter from '../../components/shared/filters/LocationFilter';
import washingImg from '../../assets/images/washing.jpg';
import SortByFilter from '../../components/shared/filters/SortByFilter';
import { VerifiedOutlined } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import Navbar from '../../components/shared/Navbar/Navbar';
import ServiceCard from '../../components/servicelist/ServiceInfoCard'
import ServiceEnquiry from '../../components/service_enquiry/ServiceEnquiry';
import wash from '../../assets/images/wash.jpg';


const ServerInfoPage = () => {

   const ServiceInfoData = [
      {
          id: 1,
          servicename: "Pratik Washing company",
          description: "Our washing company is the best in the city. We provide the best service",
          contact: "1234567890",
          location: "Pune, Maharashtra, India",
          rating: 1.5,
          imageUrl: wash,
          ratingCount: 2300
  
      },
      {
          id: 2,
          servicename: "Pratik Washing company",
          description: "Our washing company is the best in the city. We provide the best service",
          contact: "1234567890",
          location: "Pune",
          rating: 2.5,
          imageUrl: washingImg,
          ratingCount: 9237
      },
      {
          id: 3,
          servicename: "Pratik Washing company",
          description: "Our washing company is the best in the city. We provide the best service",
          contact: "1234567890",
          location: "Pune",
          rating: 1.4,
          imageUrl: washingImg,
          ratingCount: 354
      },
      {
          id: 4,
          servicename: "Pratik Washing company",
          description: "Our washing company is the best in the city. We provide the best service",
          contact: "1234567890",
          location: "Pune",
          rating: 1.8,
          imageUrl: washingImg,
          ratingCount: 2349
      },
      {
          id: 5,
          servicename: "Pratik Washing company",
          description: "Our washing company is the best in the city. We provide the best service",
          contact: "1234567890",
          location: "Pune",
          rating: 4.5,
          imageUrl: washingImg,   
          ratingCount: 29374
      },
      {
          id: 6,
          servicename: "Pratik Washing company",
          description: "Our washing company is the best in the city. We provide the best service",
          contact: "1234567890",
          location: "Pune",
          rating: 2.5,
          imageUrl: washingImg,
          ratingCount: 93724
      },
      {
          id: 7,
          servicename: "Pratik Washing company",
          description: "Our washing company is the best in the city. We provide the best service",
          contact: "1234567890",
          location: "Pune",
          rating: 3,
          imageUrl: washingImg,
          ratingCount: 93724
      },
      {
          id: 8,
          servicename: "Pratik Washing company",
          description: "Our washing company is the best in the city. We provide the best service",
          contact: "1234567890",
          location: "Pune",
          rating: 4.5,
          imageUrl: washingImg,
          ratingCount: 93724
      },
      {
          id: 9,
          servicename: "Pratik Washing company",
          description: "Our washing company is the best in the city. We provide the best service",
          contact: "1234567890",
          location: "Pune",
          rating: 1,
          imageUrl: washingImg,
          ratingCount: 93724
      },
      {
          id: 10,
          servicename: "Pratik Washing company",
          description: "Our washing company is the best in the city. We provide the best service",
          contact: "1234567890",
          location: "Pune",
          rating: 4.8,
          imageUrl: washingImg,
          ratingCount: 93724
      },
      {
          id: 11,
          servicename: "Pratik Washing company",
          description: "Our washing company is the best in the city. We provide the best service",
          contact: "1234567890",
          location: "Pune, Maharashtra, India",
          rating: 3.1,
          imageUrl: washingImg,
          ratingCount: 93724
      },
      {
          id: 12,
          servicename: "Pratik Washing company",
          description: "Our washing company is the best in the city. We provide the best service",
          contact: "1234567890",
          location: "Pune",
          rating: 1.8,
          imageUrl: washingImg,
          ratingCount: 93724
      },
      
  ]

  const [SortBy, setSortBy] = useState('');

  const handleSortByFilterChange = (event) => {
    setSortBy(event.target.value);
    console.log('Selected sort option:', event.target.value);
  };


  return (
    <ThemeProvider theme={theme}>

      <Navbar></Navbar>

      <Divider></Divider>

      <Box sx={{display:'flex',flexDirection:'row',marginTop:10,marginLeft:1,gap:2}}>
        <SortByFilter sortByValue={SortBy} handleChange={handleSortByFilterChange}></SortByFilter>
        <Button startIcon={<VerifiedOutlined></VerifiedOutlined>}  variant="outlined" sx={{height:'2.5rem',fontSize:'0.8rem',width:'max-content',color:'black',alignSelf:'center'}}>Verified</Button>
        <LocationFilter></LocationFilter>
        <GlobalSearchFilter></GlobalSearchFilter>
      </Box>


      <div style={{display:'flex',flexDirection:'row'}}>

     
      <List sx={{ width: '70%',  }}>
        {ServiceInfoData.map((service) => (
          <ServiceCard
            key={service.id}
            serviceName={service.servicename}
            rating={service.rating}
            location={service.location}
            contactNumber={service.contact}
            imageUrl={service.imageUrl}
            ratingCount={service.ratingCount}
          />
        ))}
      </List>

      <ServiceEnquiry></ServiceEnquiry>

      </div>

    </ThemeProvider>

  );
}

export default ServerInfoPage
