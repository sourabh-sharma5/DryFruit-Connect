import React, {useRef, useEffect, useState} from 'react';
import debounce from 'lodash.debounce';
import { Box, Typography, Button, CircularProgress, Backdrop } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, syncCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

import { placeOrderToFirestore } from '../app/orderApi';


const Checkout = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const syncCartDebounced = useRef(
    debounce((uid, cartItems) => {
      dispatch(syncCart({ uid, cartItems }));
    }, 1000) 
  ).current;

  
  useEffect(() => {
    if (user && user.uid) {
      syncCartDebounced(user.uid, cartItems);
    }
    
    return () => {
      if (syncCartDebounced.cancel) syncCartDebounced.cancel(); 
        
      };
    },
   [cartItems, user, syncCartDebounced, dispatch]);

  

const handlePlaceOrder = async () => {
    if (!user || !user.uid) {
      alert("Login required to place an order.");
      return;
    }

    const orderDetails = {
      cartItems,
      totalPrice,
      orderDate: new Date().toISOString(),
    };

    setLoading(true);
    try {
      const orderId = await placeOrderToFirestore(user.uid, orderDetails);

      dispatch(clearCart());
      dispatch(syncCart({ uid: user.uid, cartItems: [] }));
      navigate('/thank-you', { state: { order: { ...orderDetails, id: orderId } } });
    } catch (err) {
      alert("Failed to place order: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
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
              <Typography>{item.name} × {item.quantity} — ₹{(item.price * item.quantity).toFixed(2)}</Typography>
            </Box>
          ))}
          <Typography variant="h6" mt={2}>Total: ₹{totalPrice.toFixed(2)}</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handlePlaceOrder}
            disabled={loading}
            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
           {loading ? "Placing Order..." : "Place Order"}

          </Button>

           <Backdrop open={loading} sx={{ zIndex: 10, color: "#fff" }}>
           <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
    </Box>
  );
};

export default Checkout;
