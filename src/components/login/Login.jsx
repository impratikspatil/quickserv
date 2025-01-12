import React from "react";
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import googleIcon from "../../assets/images/google.png";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import GoogleIcon from '@mui/icons-material/Google';


const BlurryBackdrop = styled('div')({
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const LoginDialog = ({ open, onClose }) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ style: { position: 'relative',width:"28rem",borderRadius:"1rem" } }}>
      {/* <BlurryBackdrop onClick={onClose} /> */}
      <DialogContent>
        <div className="flex-column">
        <div className="flex-column">
            <Typography sx={{fontSize:"1.3rem",fontFamily:'Poppins, san-serif',width:"100%",textAlign:"center"}}>Welcome</Typography>
            <Typography sx={{fontSize:"0.8rem",fontFamily:'Poppins, san-serif',textAlign:"center"}}>Login for seamless experince</Typography>
        </div>

        <div style={{gap:"1rem",marginTop:"1rem"}} className="flex-column">
        <TextField id="name" label="Name" variant="outlined" sx={{width:"23rem",alignSelf:"center"}}/>
        <TextField id="mobile" label="Mobile" variant="outlined" sx={{width:"23rem",alignSelf:"center"}} />
        </div>

        <div className="flex-row" style={{gap:1,textAlign:"center",alignSelf:"center",fontSize:'0.8rem',fontFamily:'Poppins, san-serif'}}>
        <Checkbox {...label} />
        <Typography sx={{justifyContent:"center",alignSelf:"center",alignContent:"center"}}>I Agree to Terms and Conditions</Typography>
        </div>

        <div style={{width:"100%",textAlign:"center"}}>
        <a href='/' style={{color:'blue',fontSize:"0.8rem"}}>T&C's Privacy Policy</a>
        </div>
        <Button variant="contained" className="text-center" style={{marginTop:"1rem",height:"3.5rem",textTransform:"none",fontSize:"1rem"}}>Login with OTP</Button>

        <Divider>
            <Chip label="Or Login Using" size="small" sx={{marginTop:'1rem'}}/>
        </Divider>

        <Button startIcon={<GoogleIcon/>} variant="contained" className="text-center" sx={{ marginTop:"1rem",height:"3.5rem",textTransform:"none",fontSize:"1rem"}}>Google</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
