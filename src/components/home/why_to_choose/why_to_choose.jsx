import React from 'react'
import './why_to_choose.css';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddTaskIcon from '@mui/icons-material/AddTask';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';



const why_to_choose = () => {
  return (
    <div className='why_to_choose'>
    <h1 style={{fontWeight:'500',textAlign:'center'}}>Why to choose QuickServ?</h1>
    <div style={{display:'flex',flexDirection:'row',alignItems:'center',}}>
    <ul className='remove_list_style'>
      <li style={{display:"flex",flexDirection:'row',alignItems:'center',gap:'0.5rem'}}>
        <VerifiedUserOutlinedIcon style={{fontSize:'1rem'}} ></VerifiedUserOutlinedIcon>
        <p>Trusted Professionals</p>
      </li>
      <li style={{display:"flex",flexDirection:'row',alignItems:'center',gap:'0.5rem'}}>
      <CurrencyRupeeIcon style={{fontSize:'1rem'}} ></CurrencyRupeeIcon>
        <p>Affordable Pricing</p>
      </li>
      <li style={{display:"flex",flexDirection:'row',alignItems:'center',gap:'0.5rem'}}>
      <AccessTimeIcon style={{fontSize:'1rem'}} ></AccessTimeIcon>
        <p>Flexible Scheduling</p>
      </li>
      <li style={{display:"flex",flexDirection:'row',alignItems:'center',gap:'0.5rem'}}>
       <AddTaskIcon style={{fontSize:'1rem'}}></AddTaskIcon>   
        <p>Satisfaction Guaranteed</p>
      </li>
    </ul>
  </div>
  </div>
  )
}

export default why_to_choose
