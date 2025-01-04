import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Box, Button } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import CancelIcon from '@mui/icons-material/Cancel';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme/theme";
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const ServiceCardInfo = ({ 
  imageUrl, 
  serviceName, 
  rating, 
  location, 
  contactNumber,
  ratingCount,
  isVerified=true  
}) => {
  const [liked, setLiked] = useState(false);

  const handleLikeToggle = () => {
    setLiked(!liked);
  };

  return (
    <ThemeProvider theme={theme}>
          <Card sx={{ display: 'flex',flexDirection:'row',margin: 2 ,width:'70vw',height:"14rem" ,borderRadius:2,boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'}} >
     
      <CardMedia
        component="img"
        sx={{ width: '20%',padding: 2,borderRadius:5 }}
        image={imageUrl}
        alt={serviceName}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 1,width:'80%' }}>
        <CardContent>
         <Box sx={{ display: 'flex', flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
         <Typography   variant="h5" component="div">
            {serviceName}
          </Typography>

          <IconButton aria-label="like" onClick={handleLikeToggle}>
          <FavoriteIcon color={liked ? "error" : "inherit"} />
        </IconButton>

         </Box>

          <Box sx={{ display: 'flex', flexDirection:'row',marginTop:'0.5rem'}}>
          
          <Rating name="read-only" value={rating} readOnly />

            <Typography variant="textcolor"   sx={{marginLeft:2,lineHeight:1.7}}>
            {ratingCount} Ratings
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
          {isVerified ? (
            <VerifiedUserIcon color="success" sx={{fontSize:20}} />
          ) : (
            <CancelIcon color="error" />
          )}
        </Box>
          </Box>


          <Box sx={{ display: 'flex', flexDirection:'row',marginTop:'0.2rem'}}>
            <LocationOnOutlinedIcon sx={{fontSize:'1.2rem'}}></LocationOnOutlinedIcon>

          <Typography variant="textcolor" sx={{lineHeight:1.2}}>
            {location}
          </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection:'row',marginTop:'1rem',gap:1}}>
          <Button variant="outlined" sx={{height:'1.5rem',fontSize:'0.6rem',width:'max-content',padding:'0.4rem'}}>Daily Cloths</Button>
          <Button variant="outlined" sx={{height:'1.5rem',fontSize:'0.6rem',width:'max-content',padding:'0.4rem'}}>Shoes Wash</Button>
          <Button variant="outlined" sx={{height:'1.5rem',fontSize:'0.6rem',width:'max-content',padding:'0.4rem'}}>Daily Cloths</Button>
          <Button variant="outlined" sx={{height:'1.5rem',fontSize:'0.6rem',width:'max-content',padding:'0.4rem'}}>Daily Cloths</Button>


          </Box>
          
            <Box sx={{ display: 'flex', flexDirection:'row',marginTop:'1rem',gap:2}}>
                <Button  startIcon={<CallIcon/>} variant="contained" color="primary" sx={{borderRadius:2,backgroundColor:'#028b06'}}>{contactNumber}</Button>
                <Button  startIcon={<WhatsAppIcon sx={{color:'#028b06'}}/>} variant="contained" color="primary" sx={{borderRadius:2,backgroundColor:'#ffffff',color:'#000000'}}>WhatsApp</Button>
                <Button  startIcon={<QuestionAnswerIcon/>} variant="contained" color="primary" sx={{borderRadius:2}}>Enquiry</Button>
            </Box>
        </CardContent>
        
      </Box>
    
    </Card>

    </ThemeProvider>
  
  );
};

export default ServiceCardInfo;
