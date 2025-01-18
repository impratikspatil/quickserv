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


const Navbar = (
    {
        isLogin=true,
        userName='Pratik Patil'
    }
) => {

    const navigate = useNavigate();


    function stringAvatar(name) {
        return {
          sx: {
            bgcolor: red,
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }

      const [open, setOpen] = useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


      const onClickPostService =()=>{
        navigate('/post_service');
      }

      const onClickFindService =()=>{
        navigate('/?section=category');
      }


        
      

     
      
    return (
        <div className='navbar'>

            <div className='navbar__left'>
                <NavLink to='/' className='navbar__left__logo remove_link_style'>
                    <img src={logo} alt='logo' style={{width:"12rem", marginTop:"1rem"}} />
                    {/* QuickServ */}
                </NavLink>

            </div>

            <div className='navbar__right'>
                <a href='/' className='remove_link_style' > Home</a>
                <a href='/' className='remove_link_style' > About</a>
                <a href='/' className='remove_link_style' > Services</a>
                <Box sx={{display:'flex', flexDirection:'row',gap:2}}>
                <Button className='navbar-buttons' onClick={onClickFindService}>Find Service</Button>
                <Button className='navbar-buttons' onClick={onClickPostService}>Post Service</Button>

                
                <Box>
                {
                    isLogin ? 
                    <Avatar  {...stringAvatar(userName)} onClick={handleClickOpen}/>
                    :
                    <Button className='navbar-buttons' onClick={handleClickOpen}>Login/Sign Up</Button>
                }
                </Box>
                <LoginDialog open={open} onClose={handleClose} />

                
                </Box>

            </div>



        </div>
   
    );
};

export default Navbar;
