import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Checkbox,
  Divider,
  Box,
  Container,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import "./Login.css";

const SignUpPage = ({ onClickSendOTP }) => {
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSignUpClick = async () => {
    if (!termsAccepted) {
      alert("Please accept the Terms and Conditions to continue");
      return;
    }
    
    if (mobile.length !== 10) {
      alert("Enter a valid 10-digit mobile number!");
      return;
    }

    if (name.trim().length < 2) {
      alert("Please enter your name");
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await onClickSendOTP(mobile);
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Container maxWidth="sm">
        <Box className="login-box">
          <Typography variant="h1" className="login-title" >
            Create Account
          </Typography>
          
          <Typography variant="body1" className="login-subtitle">
            Join us and start your journey
          </Typography>

          <Box className="login-form">
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              className="login-input"
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Mobile"
              variant="outlined"
              fullWidth
              className="login-input"
              onChange={(e) => setMobile(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box className="login-terms" sx={{ marginTop: "-0.8rem" }}>
            <Checkbox 
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <Typography variant="body2" className="login-terms-text" >
              I agree to Terms and Conditions
            </Typography>
          </Box>

          <Typography variant="body2" className="login-policy-link">
            <a href="/">View our Privacy Policy</a>
          </Typography>

          <Button 
            variant="contained"
            fullWidth 
            onClick={handleSignUpClick}
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign Up with OTP"
            )}
          </Button>

          <Divider className="login-divider">
            <Typography variant="body2">Or sign up with</Typography>
          </Divider>

          <Button 
            variant="outlined"
            fullWidth
            className="login-google-button"
            startIcon={
              <Box className="google-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
              </Box>
            }
          >
            Sign up with Google
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default SignUpPage;
