import { Box, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    const orderDetails = {
      cartItems,
      totalPrice,
      orderDate: new Date().toLocaleString()
    };

    
    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

    const previousOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...previousOrders, orderDetails];

     localStorage.setItem("orders", JSON.stringify(updatedOrders));
    dispatch(clearCart());
    navigate('/thank-you');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <Typography variant="h6" mb={2}>Order Summary:</Typography>
          {cartItems.map((item) => (
            <Box key={item.id} sx={{ mb: 1 }}>
              <Typography>{item.name} × {item.quantity} — ₹{item.price * item.quantity}</Typography>
            </Box>
          ))}
          <Typography variant="h6" mt={2}>Total: ₹{totalPrice}</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </>
      )}
    </Box>
  );
};

export default Checkout;
