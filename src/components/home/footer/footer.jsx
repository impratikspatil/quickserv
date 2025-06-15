import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = React.forwardRef((props, ref) => {
  const navigate = useNavigate();

  const handleNavigation = (section) => {
    navigate(`/?section=${section}`);
  };

  return (
    <div ref={ref} className="footer__container">
      <div className="footer-content">
        <div className="footer-col quick-links">
          <h2>Quick Links</h2>
          <ul>
            <li onClick={() => handleNavigation('home')}>Home</li>
            <li onClick={() => handleNavigation('about')}>About</li>
            <li onClick={() => handleNavigation('category')}>Services</li>
            <li onClick={() => handleNavigation('contact')}>Contact</li>
          </ul>
        </div>

        <div className="footer-col contact-info">
          <h2>Contact Info</h2>
          <ul>
            <li>
              <PhoneIcon className="contact-icon" />
              <span>+91 1234567890</span>
            </li>
            <li>
              <EmailIcon className="contact-icon" />
              <span>info@quickserv.com</span>
            </li>
            <li>
              <LocationOnIcon className="contact-icon" />
              <span>Mumbai, Maharashtra, India</span>
            </li>
          </ul>
        </div>

        <div className="footer-col social-media">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FacebookIcon />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <TwitterIcon />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <InstagramIcon />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} QuickServ. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </div>
  )
})

export default Footer
