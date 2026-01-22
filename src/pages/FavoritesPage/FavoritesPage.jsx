import React, { useState, useEffect } from 'react';
import { Box, Typography, List, Container, CircularProgress } from '@mui/material';
import Navbar from '../../components/shared/Navbar/Navbar';
import ServiceCard from '../../components/servicelist/ServiceInfoCard'; // Adjust path if needed
import axios from 'axios';
import BaseURL from '../../config';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      try {
        // Change this URL to your actual Spring Boot favorites endpoint
        const response = await axios.get(`${BaseURL}api/services/favorites`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f7fe' }}>
      <Navbar />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1a202c' }}>
          Your Favorites
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress />
          </Box>
        ) : favorites.length > 0 ? (
          <List sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 3 }}>
            {favorites.map((service) => (
              <ServiceCard
                key={service.id}
                serviceName={service.serviceName}
                rating={service.rating}
                location={service.location}
                contactNumber={service.contact}
                imageUrl={service.imageUrl}
                charges={service.price}
                rateType={service.rateType}
                isVerified={service.isVerified}
              />
            ))}
          </List>
        ) : (
          <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography variant="h6" color="textSecondary">
              You haven't added any services to your favorites yet.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FavoritesPage;