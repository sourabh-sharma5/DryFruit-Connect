import React, {useEffect} from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Grid,
  Card,
  CardContent,
  CardMedia,

} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQty, decrementQty, updateQuantity, removeFromCart, clearCart, syncCart } from '../features/cart/cartSlice';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';

import Delete from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';




const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

   useEffect(() => {
    if (user && user.uid) {
      dispatch(syncCart({ uid: user.uid, cartItems }));
    }

  }, [cartItems, user, dispatch]);

  const totalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 4 }}>
          Your cart is empty.
          <br />
        
        <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/catalogue"
        sx={{ mt: 4 }}
      >
        Back to Product Catalogue
      </Button>
      </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              
              <Grid item xs={12} md={6} key={item.id}>
                <Card sx={{ display: 'flex', alignItems: 'center' }}>
                  {item.image && (
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{ width: 100, height: 100, objectFit: 'contain', p: 1 }}
                    />
                  )}

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{item.price} × {item.quantity} = ₹
                      {(item.price * item.quantity).toFixed(2)}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch(decrementQty( item.id))}
                        
                        disabled={item.quantity === 1}
                      >
                        <Remove />
                      </IconButton>

                      <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>

                      
                        {/* //size="small"
                        // onClick={() => */}
                        {/* //   dispatch(incrementQty( item.id ))}> */}
                         {/* //<Typography sx={{ mx: 1 }}>{item.quantity}</Typography> */}
                         <IconButton onClick={() => dispatch(incrementQty(item.id))}>
                      
                        <Add />
                      </IconButton>
                    </Box>
                  </CardContent>

                  <IconButton
                    onClick={() => dispatch(removeFromCart(item.id))}
                    color="error"
                    sx={{ mr: 2 }}
                  >
                    <Delete />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="h6">
              Total: <strong>₹{totalPrice().toFixed(2)}</strong>
            </Typography>

             <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ mt: 2 }}
            component={Link}
            to="/checkout"
          >
            Proceed to Checkout
          </Button>



            <Button
              variant="outlined"
              color="error"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
