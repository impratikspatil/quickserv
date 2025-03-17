import React from "react";
import { Divider } from "@mui/material";
import { internal_service_details } from "../../assets/internal_service_details";
import "./service_info_card.css";

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
        <h2>{serviceCategory.service_name}</h2>
        <Divider className="service-divider" />
        <div className="service-info-card-body">
          <ul className="service-list">
            {serviceCategory.internal_service_details.map((service, index) => (
              <li key={index}>
                <span>{service.service_includes}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfoCard;