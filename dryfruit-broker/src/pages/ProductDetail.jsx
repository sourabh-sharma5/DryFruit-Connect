import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Card, CardMedia, CardContent, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import uploadDummyData from '../utils/uploadDummyData';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = uploadDummyData.find((p) => p.id === id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (!product) {
    return(
      <Box sx={{p:4}}>
      <Typography variant="h6">Product not found.</Typography>;
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, boxShadow: 4 }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ width: { md: 400 }, height: 300, objectFit: 'cover' }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Typography variant="h6" color="text.secondary">₹{product.price}</Typography>
          <Typography variant="body1" sx={{ my: 2 }}>{product.description}</Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetail;
