import { Box, Typography, Container, Divider, Grid, Link, Link as MuiLink } from '@mui/material';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#222', color: '#fff', py: 5, width: 'full-screen' }}>
      <Container>
        <Grid container spacing={4} justifyContent="space-around">
          <Grid item xs={12} md={10}>
            <Typography variant="h4" gutterBottom>DryFruitConnect</Typography>
            <Typography variant='h6'>Healthy. Nutritious. Delicious.</Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography variant="h4" gutterBottom>Quick Links</Typography>
            <MuiLink href="/" color="inherit" underline="hover" variant='h6'>Home</MuiLink><br />
            <MuiLink href="/products" color="inherit" underline="hover" variant='h6'>Products</MuiLink><br />
            <MuiLink href="/about" color="inherit" underline="hover" variant='h6'>About</MuiLink><br />
            <MuiLink href="/contact" color="inherit" underline="hover" variant='h6'>Contact</MuiLink>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography variant="h4" gutterBottom>Contact Us</Typography>
            <Typography variant='h6'>Email: support@dryfruitconnect.com</Typography>
            <Typography variant='h6'>Phone: +91-9876543210</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: '#444' }} />
        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center', color: 'gray' }}>
          © {new Date().getFullYear()} DryFruitConnect. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;