import { Box, Container, Paper, Typography, TextField, Button, Grid } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Footer from '../components/Footer';

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
      <Grid container spacing={4} alignItems="flex-end">

        <Grid item xs={12} md={6} data-aos="fade-left">
          <Typography variant="h4" fontWeight="bold" gutterBottom>Contact Us</Typography>

          <TextField label="Name" fullWidth sx={{ mb: 2 }} />
          <TextField label="Email" fullWidth sx={{ mb: 2 }} />
          <TextField label="Message" fullWidth multiline rows={4} sx={{ mb: 2 }} />

          <Button variant="contained" >Send Message</Button>
        </Grid>
      </Grid>
      </Box>
    
    
    
    
  );
};

export default Contact;

