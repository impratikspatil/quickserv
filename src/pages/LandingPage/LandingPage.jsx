import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Hero from '../../components/home/hero/Hero'
import CategoryGrid from '../../components/home/categoryGrid/categoryGrid'
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';




const LandingPage = () => {

  const categorySectionRef = useRef(null);
  const location = useLocation();

  console.log("location",location);
  



  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('section') === 'category' && categorySectionRef.current) {
      // Smooth scroll to section 1
      categorySectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [location]);



  return (
    <div>
      <Navbar />
      <Hero />
      <CategoryGrid  ref={categorySectionRef}/>
    </div>
  );
};

export default LandingPage;
