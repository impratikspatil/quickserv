import React from 'react'
import './hero.css'
import cleaning_service from '../../../assets/images/cleaning_service.jpg'
import handyman_service from '../../../assets/images/handyman_service.jpg'
import pest_control_service from '../../../assets/images/pest_control_service.jpg'
import moving_service from '../../../assets/images/moving_service.jpg'
import maintanence_repair_service from '../../../assets/images/maintanence_repair_service.jpg'
import hvac_service from '../../../assets/images/hvac_service.jpg'
import home_security_service from '../../../assets/images/home_security_service.jpg'
import waste_management_service from '../../../assets/images/waste_management_service.jpg'
import appliance_repair_service from '../../../assets/images/waste_management_service.jpg'



import { Button } from '@mui/material'
import { PestControl } from '@mui/icons-material'

const hero = React.forwardRef((props, ref) =>  {
  return (
    <div className='hero__container' ref={ref}>
      <div className='hero__left'>
        <span className='hero__left__title'>Connecting You with <br></br>Local Experts for Every Need</span>
        <p className='hero__left__description'>Quick, reliable, and affordable services tailored to your needs.</p>
        <div className='hero__left__buttons'>
          <Button className='hero-section-buttons' >Find Service</Button>
          <span style={{ marginLeft: "1rem" }}></span>
          <Button className='hero-section-buttons' >Post Service</Button>
        </div>

      </div>

      <div className='hero__right'>

        <div className='hero__right__image_section1'>
          <img src={cleaning_service} alt='image' className='hero__right__image' />
          <img src={hvac_service} alt='image' className='hero__right__image' />
          <img src={appliance_repair_service} alt='image' className='hero__right__image' />

        </div>

        <div className='hero__right__image_section2'>
          <img src={handyman_service} alt='image' className='hero__right__image' />
          <img src={pest_control_service} alt='image' className='hero__right__image' />
          <img src={moving_service} alt='image' className='hero__right__image' />

        </div>

        <div className='hero__right__image_section3'>
          <img src={maintanence_repair_service} alt='image' className='hero__right__image' />
          <img src={home_security_service} alt='image' className='hero__right__image' />
          <img src={waste_management_service  } alt='image' className='hero__right__image' />

        </div>



      </div>

    </div>
  )
})

export default hero
