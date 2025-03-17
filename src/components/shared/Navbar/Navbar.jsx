// src/components/Shared/Navbar.jsx
import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling
import logo from '../../../assets/images/quickserv_logo.png'
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import LoginDialog from '../../login/Login.jsx'
import VerifyOTP from '../../login/VerifyOTP.jsx';
import { FALSE } from 'sass';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import profile from '../../../assets/images/image.png'
import PersonIcon from '@mui/icons-material/Person';
import SucessCard from '../NotifyCard/SuccessCard/sucesscard.jsx';
import WaitingCard from '../NotifyCard/WaitingCard/waitingcard.jsx';
import ErrorCard from '../NotifyCard/ErrorCard/errorcard.jsx'

const Navbar = (
  {
    isLogin = false,
    userName = 'Pratik Patil'
  }
) => {

  const navigate = useNavigate();
  const [ShowWatingCard, setShowWatingCard] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [mobile, setMobile] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: red,
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }



  const onClickPostService = () => {
    navigate('/post_service');
  }

  const onClickFindService = (section) => {
    if(section==='category')
    {
      navigate('/?section=category');
    }

    if(section==='about')
    {
      navigate('/?section=about');
    }

    if(section==='home')
    {
      navigate('/?section=home');
    }


    
  }


  const handleOTPSend = (mobile) => {
    setShowLogin(false);
    setShowWatingCard(true);
    setTimeout(()=>{
      setShowWatingCard(false);
      setShowOtp(true);
    setMobile(mobile);
      
    },2000)    
    


  }

  const handleClickOpen = () => {
    console.log("handleClickOpen called");
    

    setShowLogin(true);
  }

  const handleLoginClose = () => {
    setShowLogin(false)
  }

  const handleOtpClose = () => {
    setShowOtp(FALSE)
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpen(open);
  };


  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div style={{display:"flex",flexDirection:"row",padding:"1rem",fontSize:"1.5rem",gap:"1rem",alignItems:"center"}}>
       <span>Pratik Patil</span>
       <span className="circular-image-container">
       <img  src={profile} className="circular-image" style={{borderRadius:'50%'}}></img>
       </span>
      </div>
      <List>
        <Divider></Divider>
        {['Favorites', 'Saved', 'Posted by you', 'Privacy Policy','Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
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
          <img src={logo} alt='logo' style={{ width: "15rem", marginTop: "1rem" }} />
        </NavLink>

      </div>

      <div className='navbar__right'>
        <a onClick={()=>onClickFindService('home')} className='remove_link_style' > Home</a>
        <a onClick={()=>onClickFindService('about')} className='remove_link_style' > About</a>
        <a  onClick={()=>onClickFindService('category')} className='remove_link_style' > Services</a>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Button className='navbar-buttons' onClick={()=>onClickFindService('category')}>Find Service</Button>
          <Button className='navbar-buttons' onClick={onClickPostService}>Post Service</Button>


          <Box>
            {
              isLogin ?
              <div>
                  {/* <Avatar  {...stringAvatar(userName)} onClick={toggleDrawer(true)} /> */}
                  <img  onClick={toggleDrawer(true)} src={profile}  style={{borderRadius:'50%',width:'2.7rem',height:'2.7rem',marginRight:'0.5rem'}}></img>
                  
                <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
                  {list()}
                </Drawer>
              </div>
                
                :
                <PersonIcon style={{width:"2.3rem",height:"2.3rem",alignItems:"center",color:'grey',border:'1px solid grey',borderRadius:'50%',marginRight:'0.5rem',marginTop:'0.2rem'}} onClick={handleClickOpen}></PersonIcon>
                
            }
          </Box>

          {
            showLogin && <LoginDialog onClose={handleLoginClose} onClickSendOTP={handleOTPSend} />

          }

          {
            showOtp && <VerifyOTP mobile={mobile} onClose={handleOtpClose}> </VerifyOTP>
          }

          {
            ShowWatingCard && <WaitingCard mobile={mobile} onClose={handleOtpClose}> </WaitingCard>
          }


        </Box>

      </div>



    </div>

  );
};

export default Navbar;
