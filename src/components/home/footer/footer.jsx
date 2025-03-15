import React from 'react'
import './footer.css'

const footer =  React.forwardRef((props, ref) =>  {
  return (
    <div ref={ref}>
      <div className='footer__container'>
        <div className='footer-col quick-links'>
            <span>Quick Links</span>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
            </ul>
        </div>
        <div className='footer-col contact-info'>
            <span>Contact Info</span>
            <ul>
                <li>Phone: +1234567890</li>
                <li>Email: info@quickserv.com</li>
                <li>Address: 123 Main St, Anytown, USA</li>
            </ul>
        </div>
        <div className='footer-col social-media'>
            <span>Social Media</span>
            <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>LinkedIn</li>
            </ul>
        </div>
      </div>
    </div>
  )
})

export default footer
