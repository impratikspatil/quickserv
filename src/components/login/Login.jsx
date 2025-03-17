import React, { useState } from "react";
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import googleIcon from "../../assets/images/google.png";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import GoogleIcon from '@mui/icons-material/Google';
import BaseURL from "../../config";
import './Login.css'



const LoginDialog = ({ onClose, onClickSendOTP }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const [mobile, setMobile] = useState("");




  const handleLoginClick = () => {
    if (mobile.length === 10) {
      onClickSendOTP(mobile); // Notify the parent to switch dialogs
    } else {
      alert("Enter a valid 10-digit mobile number!");
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(BaseURL+'/api/otp/send', {
        phoneNumber,
      });

      if (response.data.success) {
        alert('OTP sent!');
      } else {
        setError('Failed to send OTP');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (


    <Dialog open={true} onClose={onClose} PaperProps={{ style: { position: 'relative', width: "28rem", borderRadius: "1rem" } }}>
      <DialogContent>
        <div className="flex-column">
          <div className="flex-column">
            <Typography sx={{ fontSize: "1.3rem", fontFamily: 'Poppins, san-serif', width: "100%", textAlign: "center" }}>Welcome</Typography>
            <Typography sx={{ fontSize: "0.8rem", fontFamily: 'Poppins, san-serif', textAlign: "center" }}>Login for seamless experince</Typography>
          </div>

          <div style={{ gap: "1rem", marginTop: "1rem" }} className="flex-column">
            <TextField id="name" label="Name" variant="outlined" sx={{ width: "23rem", alignSelf: "center" }} />
            <TextField id="mobile" label="Mobile" variant="outlined" onChange={(e) => setMobile(e.target.value)} sx={{ width: "23rem", alignSelf: "center" }} />
          </div>

          <div className="flex-row" style={{ gap: 1, textAlign: "center", alignSelf: "center", fontSize: '0.8rem', fontFamily: 'Poppins, san-serif' }}>
            <Checkbox {...label} />
            <Typography sx={{ justifyContent: "center", alignSelf: "center", alignContent: "center" }}>I Agree to Terms and Conditions</Typography>
          </div>

          <div style={{ width: "100%", textAlign: "center" }}>
            <a href='/' style={{ color: 'blue', fontSize: "0.8rem" }}>T&C's Privacy Policy</a>
          </div>
          <Button  className="text-center login-singup-buttons" onClick={handleLoginClick} >Login with OTP</Button>


          <Divider>
            <Chip label="Or Login Using" size="small" sx={{ marginTop: '1rem' }} />
          </Divider>

          <Button startIcon={<GoogleIcon />}  className="text-center login-singup-buttons" >Google</Button>
        </div>
      </DialogContent>
    </Dialog>



  );
};

export default LoginDialog;
