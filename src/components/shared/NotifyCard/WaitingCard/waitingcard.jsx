import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Dialog, DialogContent, Typography } from "@mui/material";
import './waitingcard.css';

const WaitingCard = ({ msg = "Sending OTP to mobile number" }) => {
  return (
    <Dialog 
      open={open} 
      PaperProps={{ style: { borderRadius: "1rem", padding: "1.5rem", textAlign: "center" } }}
    >
      <DialogContent className="waiting-dialog">
        <CircularProgress className='loading-icon' />
        <Typography className="waiting-message">{msg}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default WaitingCard;
