import React, { useState } from "react";
import "./ServiceDetailPage.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import gym from '../../assets/images/image.png'
import Reviews from "../../components/serviceDetails/reviews/Reviews";
import Pricing from "../../components/serviceDetails/pricing/Pricing";
import ContactCard from "../../components/serviceDetails/contact_card/ContactCard";
import AboutService from "../../components/serviceDetails/about/AboutService";
import Navbar from "../../components/shared/Navbar/Navbar";

const pricingInfoData = [
  {
    id: 1,
    subservice_name: "Gym training",
    price: "15,000",
    timeline: "monthly",
    info: "Full training with personal trainer",
  },
  
];

const CustomTabPanel = ({ value, index, children }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const ServiceDetailPage = ({
  companyName = "Company Name",
  companyLocation = "Address of company",
  images = []
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Navbar />
      <div className="service_details">
        <header className="service_header">
          <h1 className="service_title">
            {companyName}
            <VerifiedIcon 
              sx={{ 
                marginLeft: 1, 
                fontSize: 30, 
                color: '#28a745',
                verticalAlign: 'middle' 
              }} 
            />
          </h1>
          <p className="service_location">
            <LocationOnIcon 
              sx={{ 
                fontSize: 20, 
                color: '#666',
                verticalAlign: 'middle'
              }} 
            />
            {companyLocation}
          </p>
          <div className="service_rating">
            <StarIcon sx={{ color: '#ffc107', marginRight: 0.5 }} />
            <span>4.5</span>
            <span className="rating_count">(126 reviews)</span>
          </div>
        </header>

        <Box className="service_images">
          <img 
          src = {gym}
            // src={images[0] || "default-image-url"} 
            alt={companyName}
            className="service_image"
          />
        </Box>

        <div className="service_content">
          <Box className="service_main">
            <div className="tab_container">
              <Tabs
                value={value}
                onChange={handleChange}
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
                <AboutService />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {pricingInfoData.map((pricing) => (
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
                <Reviews />
              </CustomTabPanel>
            </div>
          </Box>

          <Box className="service_sidebar">
            <ContactCard />
          </Box>
        </div>
      </div>
    </>
  );
};

export default ServiceDetailPage;
