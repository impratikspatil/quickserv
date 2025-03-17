import React from 'react'
import './hero.css'
import { Button } from '@mui/material'

// Importing images
import gardening from '../../../assets/images/gardening.png'
import electrician from '../../../assets/images/electrician.png'
import waste_management from '../../../assets/images/waste_management.png'
import Maintenance from '../../../assets/images/Maintenance.png'
import home_improvement from '../../../assets/images/home_improvement.png'
import movers from '../../../assets/images/movers.png'
import cleaning_service from '../../../assets/images/cleaning_service.png'

const Hero = React.forwardRef((props, ref) => {
  return (
    <div className="hero__container" ref={ref}>
      {/* Left Section - Text & Buttons */}
      <div className="hero__left">
        <h1 className="hero__left__title">
          Connecting You with <br /> Local Experts for Every Need
        </h1>
        <p className="hero__left__description">
          Quick, reliable, and affordable services tailored to your needs.
        </p>
        <div className="hero__left__buttons">
          <Button className="hero-section-buttons">Find Service</Button>
          <span style={{ marginLeft: "1rem" }}></span>
          <Button className="hero-section-buttons">Post Service</Button>
        </div>
      </div>

      {/* Right Section - Image Grid */}
      <div className="hero__right">
        <div className="hero__right__images">

         <div style={{display:"flex",flexDirection:"row",gap:'2rem'}}>
         <img src={gardening} alt="Gardening" className="hero__right__image" style={{marginTop:"3rem"}} />
          <img src={electrician} alt="Electrician" className="hero__right__image" />
          <img src={waste_management} alt="Waste Management" className="hero__right__image" style={{marginTop:"3rem"}}/>
         </div>
          
          <div style={{display:"flex",flexDirection:"row",gap:"2rem"}}>
          <img src={Maintenance} alt="Maintenance" className="hero__right__image" style={{marginTop:"3rem"}}/>
          <img src={home_improvement} alt="Home Improvement" className="hero__right__image" />
          <img src={movers} alt="Movers" className="hero__right__image" style={{marginTop:"3rem"}} />
          </div>

          <div style={{display:"flex",flexDirection:"row",alignSelf:'center'}}>
        <img src={cleaning_service} alt="Cleaning Service" className="hero__right__image"  /> 
        </div>
           
        </div>
        
      </div>
    </div>
  )
})

export default Hero
