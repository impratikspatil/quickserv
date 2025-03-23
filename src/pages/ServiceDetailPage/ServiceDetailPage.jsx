import React, { useState } from "react";
import "./ServiceDetailPage.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Reviews from "../../components/serviceDetails/reviews/Reviews";
import Pricing from "../../components/serviceDetails/pricing/Pricing";
import ContactCard from "../../components/serviceDetails/contact_card/ContactCard";
import AboutService from "../../components/serviceDetails/about/AboutService";

const pricingInfoData = [
  {
    id: 1,
    subservice_name: "Gym training",
    price: "15,000",
    timeline: "monthly",
    info: "Full training with personal trainer",
  },
  {
    id: 1,
    subservice_name: "Gym training",
    price: "15,000",
    timeline: "monthly",
    info: "Full training with personal trainer",
  },
  {
    id: 1,
    subservice_name: "Gym training",
    price: "15,000",
    timeline: "monthly",
    info: "Full training with personal trainer",
  },
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
      {value === index && <div>{children}</div>}
    </div>
  );
};

const ServiceDetailPage = ({
  companyName = "Company Name",
  companyLocation = "Address of comapany",
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <div className="service_details">
      <header className="service_header">
        <h1 className="service_title">companyName</h1>
        <p className="service_location">companyLocation</p>
      </header>

      <Box className="service_images">
        <div className="image_slider">images</div>
      </Box>
      <hr></hr>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ flex: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="About" {...a11yProps(0)} />
              <Tab label="Pricing" {...a11yProps(1)} />
              <Tab label="Reviews" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <AboutService />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {pricingInfoData.map((pricing) => (
              <Pricing
                key={pricing.id}
                subservice_name={pricing.subservice_name}
                price={pricing.price}
                timeline={pricing.timeline}
                info={pricing.info}
              />
            ))}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Reviews />
          </CustomTabPanel>
        </Box>
        <Box className="side-box" sx={{ flex: 2 }}>
          <ContactCard />
        </Box>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
