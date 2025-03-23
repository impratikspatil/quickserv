import React from "react";
import List from "@mui/material/List";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const AboutService = ({
  summary = "Fitness center specializing in personalized training, weight loss consulting, and diverse workout programs.",
  yoe = 2024,
}) => {
  return (
    <div className="about-service">
      <h2>Quick Information</h2>
      <h5>Bussiness Summary</h5>
      <p>{summary}</p>
      <h5>Year of Establishment</h5>
      <p>{yoe}</p>
      <h5>Photos</h5>
      <br></br>
      <p>photos to be added</p>
      <br></br>
      <h5>Features</h5>
      <p>
        <List>
          <CheckCircleOutlineIcon /> Locker Facility{" "}
        </List>
        <List>
          <CheckCircleOutlineIcon /> Shower Facility
        </List>
        <List>
          <CheckCircleOutlineIcon /> Personal Trainers
        </List>
        <List>
          <CheckCircleOutlineIcon /> Complete Diet Guidance
        </List>
      </p>
    </div>
  );
};

export default AboutService;
