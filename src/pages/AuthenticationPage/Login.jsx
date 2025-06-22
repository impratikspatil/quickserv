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
import { useNavigate } from "react-router-dom";
import BaseURL from "../../config";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../components/shared/AuthContext";

const Login = () => {
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
    
        const token = response.data.token || response.data;
    
        login(token); 
        toast.success("Login successful!");
        navigate("/");
    
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error.response?.data || "Login failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
    
  });

  return (
    <Container maxWidth="sm">
      <Box className="login-box">
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

        <Button
              variant="outlined"
              fullWidth
              className="login-google-button"
              startIcon={<FcGoogle size={24} />}
            >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
