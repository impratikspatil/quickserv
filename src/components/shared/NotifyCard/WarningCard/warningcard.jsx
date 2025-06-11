import React from 'react'
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import './warningcard.css'
import CancelIcon from '@mui/icons-material/Cancel';


const warningcard = ({
    msg="Please fill all the fields",
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

export default warningcard
