import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider ,Typography} from '@mui/material';
import { Inbox as InboxIcon, Mail as MailIcon, Person as PersonIcon } from '@mui/icons-material';
import logo from '../../../assets/images/quickserv_logo.png';
import profile from '../../../assets/images/image.png';
// import LoginDialog from '../../login/Login.jsx';
// import VerifyOTP from '../../login/VerifyOTP.jsx';
import SucessCard from '../NotifyCard/SuccessCard/sucesscard.jsx';
import WaitingCard from '../NotifyCard/WaitingCard/waitingcard.jsx';
import ErrorCard from '../NotifyCard/ErrorCard/errorcard.jsx'
import './Navbar.css';
import { 
  FavoriteBorder as FavoriteIcon, 
  BookmarkBorder as SavedIcon, 
  History as PostedIcon, 
  PrivacyTipOutlined as PrivacyIcon, 
  LogoutOutlined as LogoutIcon 
} from '@mui/icons-material';

const Navbar = ({ isLogin = false, userName = 'Pratik Patil' }) => {
  const navigate = useNavigate();
  const [showWaitingCard, setShowWaitingCard] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [mobile, setMobile] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const navigateTo = (section) => {
    navigate(`/?section=${section}`);
  };

  const handlePostService = () => navigate('/post_service');

  const handleOTPSend = (mobile) => {
    setShowLogin(false);
    setShowWaitingCard(true);
    setTimeout(() => {
      setShowWaitingCard(false);
      setShowOtp(true);
      setMobile(mobile);
    }, 2000);
  };

  const handleVerifyOTP = () => {
    setShowOtp(false);
    setShowSuccessCard(true);
    setTimeout(() => setShowSuccessCard(false), 2000);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box sx={{ width: 280 }} role="presentation">
      <Box 
    sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      py: 4, // Increases vertical padding
      px: 2,
      backgroundColor: '#f8f9fa' 
    }}
  >
    <Avatar
      src={profile}
      sx={{ 
        width: 90, 
        height: 90, 
        mb: 2, 
        border: '4px solid white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
      }}
    />
    <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
      {userName}
    </Typography>
    <Button 
      size="small" 
      sx={{ textTransform: 'none', mt: 0.5, color: 'gray' }}
      onClick={() => {
        setDrawerOpen(false); // Close drawer
        navigate('/profile'); // Go to page
      }}
    >
      Edit Profile
    </Button>
  </Box>
      
      <Divider />
  
      <List sx={{ p: 1 }}>
        {[
          { text: 'Favorites', icon: <FavoriteIcon /> },
          { text: 'Posted by you', icon: <PostedIcon /> },
          { text: 'Privacy Policy', icon: <PrivacyIcon /> },
          { text: 'Logout', icon: <LogoutIcon color="error" /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton 
              onClick={() => handleDrawerItemClick(item.text)}
              sx={{ borderRadius: '8px' }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontSize: '0.95rem', 
                  fontWeight: 500,
                  color: item.text === 'Logout' ? '#d32f2f' : 'inherit'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleLogout = () => {
    localStorage.removeItem('token'); // This is the most important line
    navigate('/'); // Send them to landing page
    window.location.reload(); // Refresh to update the Navbar immediately
  };

  const handleDrawerItemClick = (text) => {
    // Always close the drawer first when an item is clicked
    setDrawerOpen(false);
  
    if (text === 'Logout') {
      handleLogout(); // Calls your logout function
    } else if (text === 'Favorites') {
      navigate('/favorites');
    } else if (text === 'Posted by you') {
      navigate('/my-services');
    }
    // Add other routes as needed
  };
  
  return (
    <div className='navbar'>
      <div className='navbar__left'>
        <NavLink to='/' className='navbar__left__logo remove_link_style'>
          <img src={logo} alt='logo' className="logo-img" />
        </NavLink>
      </div>
      <div className='navbar__right'>
        <a onClick={() => navigateTo('home')} className='remove_link_style'>Home</a>
        <a onClick={() => navigateTo('about')} className='remove_link_style'>About</a>
        <a onClick={() => navigateTo('category')} className='remove_link_style'>Services</a>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 ,marginRight:'2rem'}}>
          <Button className='navbar-buttons' onClick={() => navigateTo('category')}>Find Service</Button>
          <Button className='navbar-buttons' onClick={handlePostService}>Post Service</Button>
          {localStorage.getItem('token') ? (
          <img
            src={profile} 
            className='circular-image'
            onClick={toggleDrawer(true)}
            alt='Profile'
            /* Maintain specific size here if CSS isn't loading */
            style={{ 
              width: '40px', 
              height: '40px', 
              cursor: 'pointer', 
              border: '2px solid #2563eb',
              borderRadius: '50%',
              objectFit: 'cover' 
            }}
          />
        ) : (
          <PersonIcon 
            className='profile-icon' 
            onClick={() => navigate('/login')} 
            sx={{ fontSize: 32, cursor: 'pointer' }} // Adjust Icon size to match
          />
        )}
        </Box>
      </div>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
      {/* {showLogin && <LoginDialog onClose={() => setShowLogin(false)} onClickSendOTP={handleOTPSend} />} */}
      {/* {showOtp && <VerifyOTP mobile={mobile} onClose={() => setShowOtp(false)} onClickVerifyOTP={handleVerifyOTP} />} */}
      {showWaitingCard && <WaitingCard msg="Sending OTP to Mobile" mobile={mobile} />}
      {showSuccessCard && <SucessCard msg="OTP Verified Successfully" />}
    </div>
  );
};

export default Navbar;
