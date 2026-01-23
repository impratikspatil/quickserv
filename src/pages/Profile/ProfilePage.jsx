import React, { useState, useEffect } from 'react';
import { Box, Container, TextField, Button, Typography, Avatar, Paper, Grid, IconButton, CircularProgress } from '@mui/material';
import { PhotoCamera as PhotoCameraIcon, Save as SaveIcon } from '@mui/icons-material';
import Navbar from '../../components/shared/Navbar/Navbar';
import axios from 'axios';
import BaseURL from '../../config';

const ProfilePage = () => {
  const [user, setUser] = useState({ name: '', emailId: '', contactNumber: '', location: '', profileImage: '' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${BaseURL}api/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Backend Response:", response.data);
      // Fallbacks ensure the inputs stay controlled (never undefined)
      setUser({
        name: response.data.name || '',
        emailId: response.data.emailId || '',
        contactNumber: response.data.contactNumber || '',
        location: response.data.location || '',
        profileImage: response.data.profileImage || ''
      });
    } catch (err) { 
      console.error("Fetch error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    setUpdating(true);
    const token = localStorage.getItem('token');
    
    const payload = {
      name: user.name,
      location: user.location,
      profileImage: user.profileImage,
      emailId: user.emailId,
      // Sending as string to avoid Long/Integer overflow issues in Spring Boot
      contactNumber: user.contactNumber ? String(user.contactNumber).replace(/\D/g, '') : null,
    };
  
    try {
      const response = await axios.put(`${BaseURL}api/users/update`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update local state with fresh data from the server response
      setUser(response.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error Detail:", err.response?.data);
      alert("Update failed: " + (err.response?.data || "Check console"));
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  
  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar userName={user.name} />
      
      {/* Increased padding-top to create space below Navbar */}
      <Container maxWidth="sm" sx={{ mt: 10, mb: 5, flexGrow: 1 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 5, 
            borderRadius: 6, 
            textAlign: 'center',
            boxShadow: '0px 10px 30px rgba(0,0,0,0.05)',
            border: '1px solid #eee' 
          }}
        >
          <Typography variant="h5" fontWeight="800" sx={{ mb: 1, color: '#333' }}>
            Edit Profile
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Update your personal information and profile picture
          </Typography>
          
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 4 }}>
            <Avatar 
              src={user.profileImage} 
              sx={{ width: 130, height: 130, border: '5px solid #fff', boxShadow: '0px 4px 15px rgba(0,0,0,0.1)' }} 
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </Avatar>
            <input accept="image/*" id="icon-button-file" type="file" style={{ display: 'none' }} onChange={handleImageChange} />
            <label htmlFor="icon-button-file">
              <IconButton 
                component="span" 
                sx={{ 
                  position: 'absolute', bottom: 5, right: 5, 
                  bgcolor: '#f2a93b', color: 'white', 
                  boxShadow: 2,
                  '&:hover': { bgcolor: '#e0962d' } 
                }}
              >
                <PhotoCameraIcon fontSize="small" />
              </IconButton>
            </label>
          </Box>

          <Grid container spacing={2.5}>
          <Grid item xs={12}>
              <TextField 
                fullWidth label="Email Address" 
                value={user.emailId} 
                disabled 
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#fafafa' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth label="Full Name" name="name" 
                value={user.name} 
                onChange={(e) => setUser({...user, name: e.target.value})} 
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth label="Contact Number" name="contactNumber" 
                value={user.contactNumber} 
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setUser({...user, contactNumber: e.target.value})}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth label="Location" name="location" 
                value={user.location} 
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setUser({...user, location: e.target.value})}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button 
                fullWidth variant="contained" 
                startIcon={!updating && <SaveIcon />}
                onClick={handleUpdate}
                disabled={updating}
                sx={{ 
                  py: 1.8, 
                  borderRadius: 3, 
                  fontWeight: 'bold', 
                  textTransform: 'none', 
                  fontSize: '1rem',
                  bgcolor: '#f2a93b',
                  boxShadow: '0px 4px 12px rgba(242, 169, 59, 0.3)',
                  '&:hover': { bgcolor: '#e0962d', boxShadow: 'none' } 
                }}
              >
                {updating ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfilePage;