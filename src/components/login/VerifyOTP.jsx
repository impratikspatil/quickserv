import React from 'react'
import { Box, display, styled } from '@mui/system';
import TextField from "@mui/material/TextField";
import { useState } from 'react';
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import './VerifyOTP.css'



const VerifyOTP = ({ mobile, onClose,onClickVerifyOTP}) => {
    const [otp, setOtp] = useState('');

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ style: { position: 'relative', width: "28rem", borderRadius: "1rem" } }}>
            <DialogContent>
                <div className='verify-otp-dialog'>
                    <span style={{ alignSelf: "start", marginLeft: "1rem" }}>OTP Sent to mobile number {mobile}</span>
                    <Box className='flex-column gap-1'>
                        <TextField id="otp" label="Enter OTP" variant="outlined" onInput={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                            setOtp(e.target.value);
                        }} sx={{ width: "23rem", alignSelf: "center" }} />
                        <Button variant="contained" className="text-center login-singup-buttons" onClick={onClickVerifyOTP} >Verify OTP</Button>
                    </Box>

                </div>

            </DialogContent>

        </Dialog>
    )
}

export default VerifyOTP
