import React from 'react'
import './footer.css'

const Footer = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="footer__container">
      <div className="footer-col quick-links">
        <h2>Quick Links</h2>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className="footer-col contact-info">
        <h2>Contact Info</h2>
        <ul>
          <li>📞 Phone: +1234567890</li>
          <li>✉️ Email: info@quickserv.com</li>
          <li>📍 Address: 123 Main St, Anytown, USA</li>
        </ul>
      </div>

      <div className="footer-col social-media">
        <h2>Follow Us</h2>
        <ul>
          <li>Facebook</li>
          <li>Twitter</li>
          <li>Instagram</li>
          <li>LinkedIn</li>
        </ul>
      </div>
    </div>
  )
})

export default Footer
