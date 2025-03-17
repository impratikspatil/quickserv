import React from "react";
import "./why_to_choose.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddTaskIcon from "@mui/icons-material/AddTask";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

const WhyToChoose = () => {
  return (
    <div className="why_to_choose">
      <h1>Why Choose QuickServ?</h1>
      <ul className="remove_list_style">
        <li>
          <VerifiedUserOutlinedIcon />
          <p>Trusted Professionals</p>
        </li>
        <li>
          <CurrencyRupeeIcon />
          <p>Affordable Pricing</p>
        </li>
        <li>
          <AccessTimeIcon />
          <p>Flexible Scheduling</p>
        </li>
        <li>
          <AddTaskIcon />
          <p>Satisfaction Guaranteed</p>
        </li>
      </ul>
    </div>
  );
};

export default WhyToChoose;
