import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import './waitingcard.css'


const waitingcard = ({
    msg="Sending OTP to mobile number",
    onClose,


}) => {
  return (
    <div className='waiting-info-card'>
       
        <Dialog open={open} onClose={onClose} >
            <DialogContent>
                <div className='notify-dialog'>
                    <div className='dialog-icon' >
                    <CircularProgress  className='info-icon-style' style={{color:'lightblue'}}/>
                    </div>
                    <span style={{ alignSelf: "center",fontSize:'1.2rem' }}>{msg}</span>
                    
                </div>

            </DialogContent>

        </Dialog>
      
    </div>
  )
}

export default waitingcard
