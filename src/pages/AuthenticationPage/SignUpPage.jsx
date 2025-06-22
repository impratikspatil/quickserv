import React from "react";
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
  FormControlLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { FcGoogle } from "react-icons/fc";
import LockIcon from "@mui/icons-material/Lock";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useState } from 'react';
import BaseURL from "../../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/shared/AuthContext";
import "./Login.css";
import logo from "../../assets/images/quickserv_logo.png"
import wave from '../../assets/images/wave.svg';



const SignUpPage = ({ onClickSendOTP }) => {

  const navigate = useNavigate();
  const { login } = useAuth();



  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2, "Enter your full name").required("Name is Required"),
      email: Yup.string().email("Invalid email").required("Email is Required"),
      password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
      termsAccepted: Yup.boolean()
        .oneOf([true], "Accept Terms and Conditions to proceed")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post(BaseURL + "auth/signup", {
          name: values.name.trim(),
          emailId: values.email.trim(),
          password: values.password,
        });
    
        login(response.data); // ✅ updated line
        toast.success("Signup successful!");
        resetForm(); 
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Signup error:", error);
        toast.error(error.response?.data || "Signup failed. Try again.");
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="auth-background">
      <Container maxWidth="sm">
        <Box className="login-box" >
        <Box textAlign="center" >
          <img src={logo} alt="QuickServ Logo" height={40} style={{marginTop:'-1rem'}} />
        </Box>
          <Typography variant="h1" className="login-title">
            Create Account
          </Typography>
          <Typography variant="body1" className="login-subtitle" mb={-3}>
            Join us and start your journey
          </Typography>

          <form onSubmit={formik.handleSubmit} noValidate>
            <Box className="login-form" display="flex" flexDirection="column" gap={1}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password" 
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon /> 
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box mt={1}>
            <FormControlLabel
              control={
                <Checkbox
                  name="termsAccepted"
                  checked={formik.values.termsAccepted}
                  onChange={formik.handleChange}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                  I agree to Terms and Conditions
                </Typography>
              }
            />
            
            {formik.touched.termsAccepted && formik.errors.termsAccepted && (
              <Typography
                variant="caption"
                color="error"
                sx={{ marginLeft: '1rem', display: 'block',marginTop:'-0.5rem' }} // 32px aligns with checkbox
              >
                {formik.errors.termsAccepted}
              </Typography>
            )}
          </Box>

            <Typography variant="body2" className="login-policy-link">
              <a href="/">View our Privacy Policy</a>
            </Typography>

            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={formik.isSubmitting}
              className="login-button"
            >
              {formik.isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </Button>

            <Divider className="login-divider">
              <Typography variant="body2">Or sign up with</Typography>
            </Divider>

            <Button
              variant="outlined"
              fullWidth
              className="login-google-button"
              startIcon={<FcGoogle size={24} />}
            >
              Sign up with Google
            </Button>
            <Box textAlign="center" mt={2}>
              <Typography variant="body2">
                Already have an account?{" "}
                <span
                  style={{ color: "#1976D2", cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => navigate("/login")}
                >
                  Log in
                </span>
              </Typography>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default SignUpPage;
