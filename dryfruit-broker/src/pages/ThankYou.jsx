import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  const order = JSON.parse(localStorage.getItem('lastOrder'));

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom> Thank You!</Typography>
      <Typography variant="h6" mb={3}>Your order was placed successfully.</Typography>

      {order ? (
        <>
          <Typography variant="body1" sx={{ mb: 2 }}>Order Date: {order.orderDate}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>Total Amount: ₹{order.totalPrice}</Typography>

          <Typography variant="subtitle1" gutterBottom>Items Ordered:</Typography>
          {order.cartItems.map((item) => (
            <Typography key={item.id}>{item.name} × {item.quantity}</Typography>
          ))}
        </>
      ) : (
        <Typography>No order data found.</Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ mt: 4 }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default ThankYou;
