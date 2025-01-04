import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Hero from '../../components/home/hero/hero'

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
