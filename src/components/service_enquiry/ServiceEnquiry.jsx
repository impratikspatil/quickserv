import React from 'react'
import './ServiceEnquiry.css'
import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';


const ServiceEnquiry = (
    {
        category='painters'
    }
) => {
  return (
    <div className='service_enquiry'>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2,  }}> 
        <Typography  variant='boldtext'>Get list of top <span style={{color:'#219ebc'}}>{category}</span> </Typography>
        <Typography  variant='smalltext'>We'll send you contact details in seconds for free </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap:2 }}>
      <TextField id="username" label="Name" variant="outlined" size='medium' className='service_query_user_info' />
      <TextField id="contact" label="Contact" variant="outlined" size='medium' className='service_query_user_info'/>
      <Button variant="contained" size='large' sx={{width:'20rem'}}>Send Enquiry</Button>



      </Box>
    </div>
  )
}

export default ServiceEnquiry
