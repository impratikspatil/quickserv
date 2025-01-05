// src/components/Shared/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling
import logo from '../../../assets/images/quickserv_logo.png'
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';



const Navbar = (
    {
        isLogin=true,
        userName='Pratik Patil'
    }
) => {

    function stringAvatar(name) {
        return {
          sx: {
            bgcolor: red,
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
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
                <Button className='navbar-buttons'>Find Service</Button>
                <Button className='navbar-buttons' >Post Service</Button>

                
                <Box>
                {
                    isLogin ? 
                    <Avatar  {...stringAvatar(userName)} />
                    :
                    <Button className='navbar-buttons' >Login/Sign Up</Button>
                }
                </Box>
                
                </Box>

            </div>



        </div>
   
    );
};

export default Navbar;
