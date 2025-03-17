import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import './sucesscard.css'


const sucesscard = ({
    msg="OTP Sent Successfully",
    onClose,


}) => {
  return (
    <div className='success-info-card'>
       
        <Dialog open={open} onClose={onClose} >
            <DialogContent>
                <div className='notify-dialog'>
                    <div className='dialog-icon' >
                    <CheckCircleOutlineIcon  className='info-icon-style'/>
                    </div>
                    <span style={{ alignSelf: "center",fontSize:'1.2rem' }}>{msg}</span>
                    
                </div>

            </DialogContent>

        </Dialog>
      
    </div>
  )
}

export default sucesscard
