import React from "react";
import "./about_us.css";

const AboutUs = React.forwardRef((props, ref) => {
  return (
    <div className="about_us" ref={ref}>
      <h1>About Us</h1>
      <p>
        At <strong>QuickServ</strong>, we believe that maintaining your home should be 
        simple, stress-free, and reliable. Our mission is to connect you with 
        <strong> trusted professionals</strong> for all your home service needs, ensuring
        quality, affordability, and peace of mind.
      </p>
    </div>
  );
});

export default AboutUs;
