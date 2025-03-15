import React from "react";
import { Divider } from "@mui/material";
import { internal_service_details } from "../../assets/internal_service_details";
import './service_info_card.css';

const ServiceInfoCard = ({ service_name = "Maintenance & Repairs" }) => {
  // Find the service category based on the service_name
  const serviceCategory = internal_service_details.find(
    (category) => category.service_name === service_name
  );

  // If the service category is not found, display a message
  if (!serviceCategory) {
    return <div>Service not found.</div>;
  }

  return (
    <div className="service-info-card">
      <div className="service-info-card-header">
        <span style={{fontSize: '1.5rem',paddingBottom: '1rem'}}>{serviceCategory.service_name}</span>
        <Divider  style={{marginBottom: '1rem',marginTop:'1rem'}}/>
        <div className="service-info-card-body">
          <ul style={{textDecoration:'none',lineHeight:'2.5rem'}}>
            {serviceCategory.internal_service_details.map((service, index) => (
              <li key={index}>
                <span style={{fontSize: '1rem'}}>{service.service_includes}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfoCard;