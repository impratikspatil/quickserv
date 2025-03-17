import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Hero from '../../components/home/hero/hero.jsx'
import CategoryGrid from '../../components/home/categoryGrid/categoryGrid'
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Footer from '../../components/home/footer/footer';
import AboutUs from '../../components/home/about_us/about_us';
import WhyToChoose from '../../components/home/why_to_choose/why_to_choose';
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
  const navigate = useNavigate();

  const categorySectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const homeSectionRef=useRef(null)
  const footerSectionRef=useRef(null)
  const location = useLocation();

  console.log("location", location);


  const handleServiceCategoryClick=(category_name)=>{
    navigate("/service", { state: { service_category: category_name } });

  }


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('section') === 'category' && categorySectionRef.current) {
      categorySectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    if (params.get('section') === 'about' && aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    if (params.get('section') === 'home' && homeSectionRef.current) {
      homeSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    if (params.get('section') === 'foote' && footerSectionRef.current) {
      footerSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }


  }, [location]);



  return (
    <div>
      <Navbar  />
      <Hero ref={homeSectionRef} />
      <CategoryGrid ref={categorySectionRef} onClickServiceCategory={handleServiceCategoryClick}/>
      <div  ref={aboutSectionRef} style={{display:"flex",flexDirection:"row",justifyContent:'space-around'}}>
        <AboutUs />
        <WhyToChoose/>
      </div>
      <Footer ref={footerSectionRef} />
    </div>
  );
};

export default LandingPage;
