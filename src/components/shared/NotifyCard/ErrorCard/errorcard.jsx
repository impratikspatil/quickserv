import React from 'react'
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import './errorcard.css'
import CancelIcon from '@mui/icons-material/Cancel';


const errorcard = ({
    msg="Failed to sent otp",
    onClose,


}) => {
  return (
    <div className='success-info-card'>
       
        <Dialog open={open} onClose={onClose} >
            <DialogContent>
                <div className='notify-dialog'>
                    <div className='dialog-icon' >
                    <CancelIcon  className='info-icon-style' style={{color:"red "}}/>
                    </div>
                    <span style={{ alignSelf: "center",fontSize:'1.2rem' }}>{msg}</span>
                    
                </div>

            </DialogContent>

        </Dialog>
      
    </div>
  )
}

export default errorcard
