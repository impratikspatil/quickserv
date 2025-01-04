import React, { useState } from "react";
import "./serviceDetails.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ImageSlider from "../shared/ImageSlider/ImageSlider";

const CustomTabPanel = ({ value, index, children }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

const images = [
  {
    url: "https://plus.unsplash.com/premium_photo-1664301437780-ee46787734d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3ltJTIwc2hvcCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    title: "img1",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1664301437780-ee46787734d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3ltJTIwc2hvcCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    title: "img1",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1664301437780-ee46787734d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3ltJTIwc2hvcCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    title: "img1",
  },
];

const serviceDetails = () => {
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
        <h1 className="service_title">Fitnation Club</h1>
        <p className="service_location">
          Near Kaka Halwai, Near Abhinav Kala, Sadashiv Peth, Pune
        </p>
      </header>

      <section className="service_images">
        <div className="image_slider">
          <ImageSlider images={images} />
        </div>
      </section>

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
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </div>
  );
};

export default serviceDetails;
