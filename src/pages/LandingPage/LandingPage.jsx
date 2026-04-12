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
import { useAuth } from "../../components/shared/AuthContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const categorySectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const homeSectionRef = useRef(null);
  const footerSectionRef = useRef(null);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const handleServiceCategoryClick = (category_name) => {

        if (isAuthenticated) {
          navigate("/service", { state: { service_category: category_name } });
        } else {
          navigate("/login", {
            state: {
              redirectTo: "/service",
              selectedCategory: category_name
            }
          });
        }
  }

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
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
    } else if (section === 'footer' && footerSectionRef.current) {
      scrollToSection(footerSectionRef);
    }
  }, [location]);

  return (
    <div>
      <Navbar />
      <div ref={homeSectionRef}>
  <Hero />
</div>

      <div ref={categorySectionRef}>
        <CategoryGrid onClickServiceCategory={handleServiceCategoryClick} />
      </div>

      
      <div ref={aboutSectionRef} className="flex flex-row justify-around gap-6 px-10">
        <AboutUs />
        <WhyToChoose />
      </div>
      <div ref={footerSectionRef}>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
