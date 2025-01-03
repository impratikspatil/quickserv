// src/components/Shared/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling
import Button from '../Button/Button';
import logo from '../../../assets/images/quickserv_logo.png'



const Navbar = () => {
    return (
        <div className='navbar'>

            <div className='navbar__left'>
                <NavLink to='/' className='navbar__left__logo remove_link_style'>
                    <img src={logo} alt='logo' style={{width:"12rem", marginTop:"1rem"}} />
                    {/* QuickServ */}
                </NavLink>

            </div>

            <div className='navbar__right'>
                <a href='#id1' className='remove_link_style'> Home</a>
                <a href='#id2' className='remove_link_style'> About</a>
                <a href='#id3' className='remove_link_style'> Services</a>
                <a href='#id4' className='remove_link_style' > Contact</a>
                <div>
                <Button variant='default' size='medium'>Find Service</Button>
                <span style={{marginLeft:"1rem"}}></span>
                <Button variant='default' size='medium'>Post Service</Button>
                </div>

            </div>



        </div>
   
    );
};

export default Navbar;
