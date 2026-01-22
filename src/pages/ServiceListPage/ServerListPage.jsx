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
import { category_list } from '../../assets/assets';

const ServerInfoPage = () => {

  const location = useLocation();
  const { service_category } = location.state || {};
  console.log("service_category",service_category);
  
  

  

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
  const [categories, setCategories] = useState(category_list);
  const [serviceInfoData, setServiceInfoData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategoryIcon = (categoryName) => {
    const category = category_list.find(cat => cat.category_name === categoryName);
    return category ? category.category_icon : 'settings'; // 'settings' is a generic fallback
  };

  const handleSortByFilterChange = (event) => {
    setSortBy(event.target.value);
    console.log('Selected sort option:', event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("token is ",token);
    setLoading(true);
    
    // Only make API calls if token exists (optional for testing)
    if (token) {
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
          const data = response.data || [];
          console.log("services data is ",data);
          setServiceInfoData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching services:', error);
          // Use fallback data if API fails
          setServiceInfoData(ServiceInfoData);
          setLoading(false);
        });
    } else {
      console.log('No token found - using fallback data for testing.');
      // Use hardcoded data as fallback when no token
      setServiceInfoData(ServiceInfoData);
      setLoading(false);
    }
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

            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>Loading services...</p>
              </div>
            ) : serviceInfoData.length > 0 ? (
              <List className="services-list">
                {serviceInfoData
                  .filter(service => {
                    // Filter by category if service_category is provided
                    if (!service_category) return true;
                    // Check if service matches the selected category
                    // API services might have serviceCategory field, hardcoded might not
                    return service.serviceCategory === service_category || 
                           service.category === service_category ||
                           !service.serviceCategory; // Show all if no category filter matches
                  })
                  .map((service) => {
                    // NEW: Logic to handle fallback icons
                    const categoryName = service.serviceCategory || service_category || "General";
                    const iconName = getCategoryIcon(categoryName);
                    
                    // Construct image path if it exists, otherwise pass null
                    const displayImage = service.imageUrl 
                      ? (service.imageUrl.startsWith('http') ? service.imageUrl : `${BaseURL}${service.imageUrl}`) 
                      : null;
                  
                    return (
                      <ServiceCard
                        id={service.serviceId || service.id}
                        key={service.serviceId || service.id}
                        serviceName={service.serviceName || service.servicename}
                        rating={service.rating || 0}
                        location={service.address || service.location || 'Location not specified'}
                        contactNumber={service.whatsappNumber || service.contact}
                        
                        // CHANGED: Pass displayImage and the fallback iconName
                        imageUrl={displayImage}
                        categoryIcon={iconName} 
                        
                        ratingCount={service.ratingCount || 0}
                        rateType={service.rateType || '/service'}
                        charges={service.price || service.charges || 0}
                        tags={service.tags || []}
                        isVerified={service.isVerified || false}
                        rateCount={service.rateCount || 0}
                      />
                    );
                  }
                  )}
              </List>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>No services found{service_category ? ` for ${service_category}` : ''}.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ServerInfoPage
