import React from "react";
import {
  Button,
  Typography,
  TextField,
  Divider,
  Box,
  Container,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import BaseURL from "../../config";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../components/shared/AuthContext";
import logo from "../../assets/images/quickserv_logo.png"
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();


  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Minimum 6 characters").required("Password is required")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(BaseURL + "auth/login", {
          emailId: values.email,
          password: values.password
        });

        console.log("LOGIN RESPONSE:", response.data);
    
        const { token, user } = response.data;

        login(token, user);
        toast.success("Login successful!");
        const redirectTo = location.state?.redirectTo || "/";
        const category = location.state?.selectedCategory;

        navigate(redirectTo, {
          state: category ? { service_category: category } : {}
        });
    
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error.response?.data || "Login failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
    
  });

  return (
    <div className="auth-background">
    <Container maxWidth="sm">
      <Box className="login-box">
      <Box textAlign="center" mb={2}>
          <img src={logo} alt="QuickServ Logo" height={40} />
        </Box>

        <Typography variant="h1" className="login-title">
          Welcome Back!
        </Typography>

        <Typography variant="body1" className="login-subtitle">
          Sign in to continue your journey with us
        </Typography>

        <form onSubmit={formik.handleSubmit} noValidate>
          <Box className="login-form">
            <TextField
              label="Email"
              name="email"
              fullWidth
              className="login-input"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                )
              }}
              margin="normal"
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              className="login-input"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                )
              }}
              margin="normal"
            />
          </Box>

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
              "Login"
            )}
          </Button>
        </form>

        <Divider className="login-divider">
          <Typography variant="body2">Or continue with</Typography>
        </Divider>

        <Box mt={2}>
  <GoogleLogin
    onSuccess={async (credentialResponse) => {
      try {
        console.log("Google Token:", credentialResponse.credential);

        const res = await axios.post(BaseURL + "auth/google", {
          token: credentialResponse.credential
        });

        console.log("GOOGLE RESPONSE:", res.data);

        const { token, user } = res.data;

        login(token, user);
        toast.success("Google login successful!");

        const redirectTo = location.state?.redirectTo || "/";
        const category = location.state?.selectedCategory;

        navigate(redirectTo, {
          state: category ? { service_category: category } : {}
        });

      } catch (err) {
        console.error(err);
        toast.error("Google login failed");
      }
    }}
    onError={() => {
      toast.error("Google Login Failed");
    }}
  />
</Box>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            Don&apos;t have an account?{" "}
            <span
              style={{ color: "#1976D2", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/signup")}
            >
              Sign up here
            </span>
          </Typography>
        </Box>

       
      </Box>
    </Container>
    </div>
  );
};

export default Login;
