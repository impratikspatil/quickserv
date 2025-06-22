import React, { useState, useEffect } from 'react';
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
import { internal_service_details } from '../../assets/internal_service_details';
import ServiceInfoCard from '../../components/service_info_card/service_info_card';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import BaseURL from '../../config';
import './ServiceListPage.css';

const ServerInfoPage = () => {

  const location = useLocation();
  const { service_category } = location.state || {};
  console.log("service_category",service_category);
  const token = localStorage.getItem('token');

  

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
  const [categories, setCategories] = useState([]);
  const [serviceInfoData, setServiceInfoData] = useState([]);

  const handleSortByFilterChange = (event) => {
    setSortBy(event.target.value);
    console.log('Selected sort option:', event.target.value);
  };

  useEffect(() => {
    // Fetch categories
    axios.get(BaseURL+'api/category',{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    // Fetch services
    axios.get(BaseURL+'api/services',{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setServiceInfoData(response.data);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="service-list-container">
        <Navbar />
        
        <div className="service-list-content">
          <div className="filters-section">
            <ServiceInfoCard 
              service_name={service_category} 
              categories={categories}
            />
          </div>

          <div className="services-section">
            <div className="filters-header">
              <GlobalSearchFilter />
              <LocationFilter />
              <SortByFilter 
                sortByValue={SortBy} 
                handleChange={handleSortByFilterChange}
              />
              <Button 
                startIcon={<VerifiedOutlined />} 
                variant="outlined" 
                className="verified-button"
              >
                Verified
              </Button>
            </div>

            <List className="services-list">
              {serviceInfoData.map((service) => (
                <ServiceCard
                  key={service.serviceId}
                  serviceName={service.serviceName}
                  rating={service.rating}
                  location={service.address}
                  contactNumber={service.whatsappNumber}
                  imageUrl={service.imageUrl}
                  ratingCount={service.ratingCount}
                  rateType={service.rateType}
                  charges={service.price}
                  tags={service.tags}
                  isVerified={service.isVerified}
                  rateCount={service.rateCount}
                />
              ))}
            </List>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ServerInfoPage
