import React from 'react'
import './about_us.css';

const about_us =  React.forwardRef((props, ref) =>  {
  return (
    <div className='about_us' ref={ref}>
      <h1 style={{fontWeight:'500',textAlign:'center'}}>About Us</h1>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:'2rem',paddingRight:'2rem'}}>
        <p style={{fontSize:'1rem',lineHeight:'2rem'}}>At QuickServ, we believe that maintaining your home should be simple, stress-free, and reliable. Our mission is to connect you with trusted professionals for all your home service needs, ensuring quality, affordability, and peace of mind.</p>
        
      </div>
    </div>
  )
})

export default about_us
