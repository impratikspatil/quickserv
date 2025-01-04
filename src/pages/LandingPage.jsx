import React from "react";
import Navbar from "../components/shared/Navbar/Navbar";
import Hero from "../components/home/hero/hero";
import CategoryGrid from "../components/home/categoryGrid/categoryGrid";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <CategoryGrid />
    </div>
  );
};

export default LandingPage;
