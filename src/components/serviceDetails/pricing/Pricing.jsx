import React from "react";
import { 
  Box, 
  Typography,
  Card,
  CardContent,
  Button,
  Divider
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import "./Pricing.css";

const pricingData = [
  {
    title: "Monthly Membership",
    price: "1,500",
    duration: "per month",
    features: [
      "Access to all equipment",
      "Basic trainer assistance",
      "Locker facility",
      "Flexible timing"
    ]
  },
  {
    title: "Quarterly Package",
    price: "4,000",
    duration: "per 3 months",
    features: [
      "All monthly benefits",
      "Personal training session",
      "Diet consultation",
      "Progress tracking"
    ],
    popular: true
  },
  {
    title: "Annual Membership",
    price: "15,000",
    duration: "per year",
    features: [
      "All quarterly benefits",
      "Unlimited trainer support",
      "Nutrition planning",
      "Body composition analysis"
    ]
  },
  {
    title: "Premium Package",
    price: "20,000",
    duration: "per year",
    features: [
      "All annual benefits",
      "Personal nutritionist",
      "24/7 support",
      "Special classes access"
    ]
  }
];

const Pricing = () => {
  return (
    <div className="pricing-container">
      <Typography variant="h6" className="pricing-title">
        Membership Plans
      </Typography>
      
      <div className="pricing-scroll-container">
        <div className="pricing-cards-container">
          {pricingData.map((plan, index) => (
            <Card key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && (
                <div className="popular-tag">Most Popular</div>
              )}
              <CardContent className="pricing-card-content">
                <Typography variant="h6" className="plan-title">
                  {plan.title}
                </Typography>
                
                <Box className="price-container">
                  <CurrencyRupeeIcon className="rupee-icon" />
                  <Typography variant="h4" className="price">
                    {plan.price}
                  </Typography>
                  <Typography variant="body2" className="duration">
                    {plan.duration}
                  </Typography>
                </Box>

                <Divider className="pricing-divider" />

                <Box className="features-list">
                  {plan.features.map((feature, idx) => (
                    <Box key={idx} className="feature-row">
                      <CheckCircleOutlineIcon className="feature-icon" />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  ))}
                </Box>

                <Button 
                  variant="contained" 
                  className="select-plan-button"
                  fullWidth
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Box className="additional-info">
        <Typography variant="body2" className="info-text">
          <AccessTimeIcon className="info-icon" />
          All plans include access during working hours (6:00 AM - 10:00 PM)
        </Typography>
      </Box>
    </div>
  );
};

export default Pricing;