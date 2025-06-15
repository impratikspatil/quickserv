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
  const homeSectionRef = useRef(null);
  const footerSectionRef = useRef(null);
  const location = useLocation();

  const handleServiceCategoryClick = (category_name) => {
    navigate("/service", { state: { service_category: category_name } });
  }

  const scrollToSection = (ref) => {
    if (ref.current) {
      const navbarHeight = 64; // Height of the navbar
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');

    if (section === 'category' && categorySectionRef.current) {
      scrollToSection(categorySectionRef);
    } else if (section === 'about' && aboutSectionRef.current) {
      scrollToSection(aboutSectionRef);
    } else if (section === 'home' && homeSectionRef.current) {
      scrollToSection(homeSectionRef);
    } else if (section === 'foote' && footerSectionRef.current) {
      scrollToSection(footerSectionRef);
    }
  }, [location]);

  return (
    <div>
      <Navbar />
      <Hero ref={homeSectionRef} />
      <CategoryGrid ref={categorySectionRef} onClickServiceCategory={handleServiceCategoryClick} />
      <div ref={aboutSectionRef} style={{ display: "flex", flexDirection: "row", justifyContent: 'space-around' }}>
        <AboutUs />
        <WhyToChoose />
      </div>
      <Footer ref={footerSectionRef} />
    </div>
  );
};

export default LandingPage;
