import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useEffect } from 'react'; // Added useEffect
import Rating from '@mui/material/Rating';
import CancelIcon from '@mui/icons-material/Cancel';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme/theme";
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { VerifiedOutlined } from '@mui/icons-material';
import { Box, Button, Skeleton, Fade } from "@mui/material"; // Added Skeleton and Fade


const ServiceCardInfo = ({
  imageUrl,
  serviceName,
  rating,
  location,
  contactNumber,
  ratingCount,
  isVerified = true
}) => {
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);


  const handleLikeToggle = () => {
    setLiked(!liked);
  };

  if (isLoading) {
    return (
      <Card sx={{ display: 'flex', flexDirection: 'row', marginLeft: '1rem', marginRight: '2rem', marginBottom: 2, width: '70vw', height: "13rem", borderRadius: 2, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <Skeleton variant="rectangular" width="20%" height='80%' sx={{ borderRadius: 5, margin: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 1, width: '70vw' }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' ,justifyContent: 'space-between' }}>
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="circular" width={40} height={40} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Skeleton variant="text" width="20%" height={20} />
              <Skeleton variant="text" width="30%" height={20} sx={{ marginLeft: 2 }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Skeleton variant="text" width="40%" height={20} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 1, gap: 1 }}>
              <Skeleton variant="rectangular" width="20%" height={30} />
              <Skeleton variant="rectangular" width="20%" height={30} />
              <Skeleton variant="rectangular" width="20%" height={30} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2, gap: 2 }}>
              <Skeleton variant="rectangular" width="30%" height={40} />
              <Skeleton variant="rectangular" width="30%" height={40} />
              <Skeleton variant="rectangular" width="30%" height={40} />
            </Box>
          </CardContent>
        </Box>
      </Card>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ display: 'flex', flexDirection: 'row', marginLeft: '1rem', marginRight: '1rem', marginBottom: 2, width: '70vw', height: "13rem", borderRadius: 2, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }} >

        <CardMedia
          component="img"
          sx={{ width: '20%', padding: 2, borderRadius: "2rem" }}
          image={imageUrl}
          alt={serviceName}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 1, width: '80%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: 20 }}>
                {serviceName}
              </Typography>

              <IconButton aria-label="like" onClick={handleLikeToggle}>
                <FavoriteIcon color={liked ? "error" : "inherit"} />
              </IconButton>

            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>

              <Rating name="read-only" value={rating} readOnly size="small" />

              <Typography variant="textcolor" sx={{ marginLeft: 2, fontSize: 12 }}>
                {ratingCount} Ratings
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
                {isVerified ? (
                  <VerifiedOutlined color="success" sx={{ fontSize: 18 }} />
                ) : (
                  <CancelIcon color="error" />
                )}
              </Box>
            </Box>


            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '0.2rem' }}>
              <LocationOnOutlinedIcon sx={{ fontSize: '0.9rem' }}></LocationOnOutlinedIcon>

              <Typography variant="textcolor" sx={{ fontSize: 12 }}>
                {location}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '0.5rem', gap: 1 }}>
              <Button variant="outlined" sx={{ height: '1.5rem', fontSize: '0.5rem', width: 'max-content', padding: '0.4rem', textTransform: 'none' }}>Daily Cloths</Button>
              <Button variant="outlined" sx={{ height: '1.5rem', fontSize: '0.5rem', width: 'max-content', padding: '0.4rem', textTransform: 'none' }}>Shoes Wash</Button>
              <Button variant="outlined" sx={{ height: '1.5rem', fontSize: '0.5rem', width: 'max-content', padding: '0.4rem', textTransform: 'none' }}>Daily Cloths</Button>
              <Button variant="outlined" sx={{ height: '1.5rem', fontSize: '0.5rem', width: 'max-content', padding: '0.4rem', textTransform: 'none' }}>Daily Cloths</Button>


            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '1rem', gap: 2 }}>
              <Button startIcon={<CallIcon />} variant="contained" color="primary" sx={{ borderRadius: 2, backgroundColor: '#028b06', textTransform: 'none', fontSize: 12 }}>{contactNumber}</Button>
              <Button startIcon={<WhatsAppIcon sx={{ color: '#028b06' }} />} variant="contained" color="primary" sx={{ borderRadius: 2, backgroundColor: '#ffffff', color: '#000000', textTransform: 'none', fontSize: 12 }}>WhatsApp</Button>
              <Button startIcon={<QuestionAnswerIcon />} variant="contained" color="primary" sx={{ borderRadius: 2, textTransform: 'none', fontSize: 12 }}>Enquiry</Button>
            </Box>
          </CardContent>

        </Box>

      </Card>

    </ThemeProvider>

  );
};

export default ServiceCardInfo;
  