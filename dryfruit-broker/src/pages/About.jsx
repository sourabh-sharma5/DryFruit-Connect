import { Box, Container, Typography, Grid } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Footer from '../components/Footer';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Box sx={{ mt:2 }}>
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4} alignItems="center">
         <Box sx={{ width: '100%' }} >
        <Grid item xs={12} md={6} data-aos="fade-left">
          <Typography variant="h3" fontWeight="bold" gutterBottom>About Us</Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            DryFruitConnect is your trusted online dry fruit broker, connecting dealers with customers seamlessly.
            We aim to deliver quality products like almonds, cashews, raisins, and more—straight from the best dealers.
          </Typography>
        </Grid>
        </Box>
      </Grid>
    
    <Box sx={{  py: 6, mt: 4 }}>
      <Grid item xs={12} md={6} data-aos="fade-left">
        <Typography variant="h3" gutterBottom>Our Mission</Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          Our mission is to provide a reliable platform for dry fruit dealers and customers, ensuring quality, transparency, and convenience in every transaction.
        </Typography>
        </Grid>
      
      </Box>
      </Container>
    <Box >
    <Footer />
    </Box>
    </Box>
  );
};

export default About;
