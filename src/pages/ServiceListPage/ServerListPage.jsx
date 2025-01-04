import React from 'react'
import ServiceInfoData from '../../assets/asset';
import ServiceCard from '../../components/service/ServiceInfoCard';
import List from '@mui/material/List';
import theme from '../../theme/theme';
import { ThemeProvider } from '@mui/material/styles';

const ServerInfoPage = () => {
    return (
        <ThemeProvider theme={theme}>
             <List sx={{ width: '100%', maxWidth: 600,bgcolor: 'background.paper' }}>
          {ServiceInfoData.map((service) => (
            <ServiceCard 
              key={service.id}
              serviceName={service.servicename}
              rating={service.rating}
              location={service.location}
              contactNumber={service.contact}
              imageUrl={service.imageUrl}
              ratingCount={service.ratingCount}
            />
          ))}
        </List>

        </ThemeProvider>
       
      );
}

export default ServerInfoPage
