import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';

const HeroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'grey',
        color: 'A7C1A8',
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 8 },
        textAlign: 'center',
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 1440 320"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 1,
        }}
      >
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,160L40,154.7C80,149,160,139,240,128C320,117,400,107,480,122.7C560,139,640,181,720,202.7C800,224,880,224,960,218.7C1040,213,1120,203,1200,170.7C1280,139,1360,85,1400,58.7L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </Box>

      <Box
        data-aos="fade-up"
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '700px',
          margin: '0 auto',
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Discover the Finest Dry Fruits
        </Typography>
        <Typography variant="h6" mb={4}>
          Premium quality handpicked nuts delivered at your doorstep.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/products"
          sx={{ bgcolor: '#fff', color: 'maroon', fontWeight: 'bold', '&:hover': { bgcolor: '#f0f0f0' } }}
        >
          Shop Now
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
