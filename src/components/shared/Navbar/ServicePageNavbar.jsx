import React from 'react'
import { Box } from '@mui/material'

const ServicePageNavbar = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 2, borderBottom: '1px solid #e0e0e0' }}>
            <Box className='navbar__left'>
                <NavLink to='/' className='navbar__left__logo remove_link_style'>
                    <img src={logo} alt='logo' style={{width:"12rem", marginTop:"1rem"}} />
                    {/* QuickServ */}
                </NavLink>

            </Box>

            
    </Box>
  )
}

export default ServicePageNavbar
