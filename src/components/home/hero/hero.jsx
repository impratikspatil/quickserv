import React from 'react'
import './hero.css'
import painters from '../../../assets/images/painters.png'
import delivery from '../../../assets/images/delivery.png'
import cleaners from '../../../assets/images/cleaners.png'
import { Button } from '@mui/material'

const Hero = () => {
  return (
    <div className='hero__container'>
         <div className='hero__left'>
            <span className='hero__left__title'>Connecting You with <br></br>Local Experts for Every Need</span>
            <p className='hero__left__description'>Quick, reliable, and affordable services tailored to your needs.</p>
            <div className='hero__left__buttons'>
                <Button className='navbar-buttons' >Find Service</Button>
                <span style={{marginLeft:"1rem"}}></span>
                <Button className='navbar-buttons'>Post Service</Button>
            </div>

        </div>

        <div className='hero__right'>

            <div className='hero__right__image_section1'>
                <img src={painters} alt='image' className='hero__right__image' />

            </div>

            <div className='hero__right__image_section2'>
            <img src={delivery} alt='image' className='hero__right__image' />
            <img src={cleaners} alt='image' className='hero__right__image' />

            </div>

            <div className='hero__right__image_section3'>
            <img src={cleaners} alt='image' className='hero__right__image' />

            </div>

            

        </div>
    
    </div>
  )
}

export default Hero
