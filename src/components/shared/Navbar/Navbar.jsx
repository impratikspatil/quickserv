import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Inbox as InboxIcon, Mail as MailIcon, Person as PersonIcon } from '@mui/icons-material';
import logo from '../../../assets/images/quickserv_logo.png';
import profile from '../../../assets/images/image.png';
// import LoginDialog from '../../login/Login.jsx';
// import VerifyOTP from '../../login/VerifyOTP.jsx';
import SucessCard from '../NotifyCard/SuccessCard/sucesscard.jsx';
import WaitingCard from '../NotifyCard/WaitingCard/waitingcard.jsx';
import ErrorCard from '../NotifyCard/ErrorCard/errorcard.jsx'
import './Navbar.css';

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
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="profile-header">
        <span>{userName}</span>
        <img src={profile} alt="profile" className="circular-image" />
      </div>
      <Divider />
      <List>
        {['Favorites', 'Saved', 'Posted by you', 'Privacy Policy', 'Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
          <Box>
            {isLogin ? (
              <img
                src={profile}
                className='circular-image'
                onClick={toggleDrawer(true)}
                alt='Profile'
              />
            ) : (
              <PersonIcon className='profile-icon' onClick={() => setShowLogin(true)} />
            )}
          </Box>
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
