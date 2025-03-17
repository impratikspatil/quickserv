import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import './sucesscard.css';

const Sucesscard = ({  onClose, msg = "OTP Sent Successfully" }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      PaperProps={{ style: { borderRadius: "1rem", padding: "1.5rem", textAlign: "center" } }}
    >
      <DialogContent className="notify-dialog">
        <CheckCircleOutlineIcon className='info-icon-style' />
        <Typography className="success-message">{msg}</Typography>
        <Button onClick={onClose} className="success-btn">OK</Button>
      </DialogContent>
    </Dialog>
  );
};

export default Sucesscard;
