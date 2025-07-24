import { Box, Grid, Typography } from '@mui/material';

import ProductCard from '../components/ProductCard';
import uploadDummyData from '../utils/uploadDummyData';


const Products = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Our Products</Typography>
      <Grid container spacing={2}>
        {uploadDummyData.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} data-aos="fade-up" display="flex" justifyContent="center">
                      <ProductCard product={product} />
                    </Grid>
        ))}
      </Grid>
    </Box>
  
  );
};

export default Products;
