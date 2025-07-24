import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../features/cart/cartSlice';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItemRow = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const newQty = parseInt(e.target.value, 10);
    if (!isNaN(newQty)) {
      dispatch(updateQuantity({ id: item.id, quantity: newQty }));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <img src={item.image} alt={item.name} width={60} height={60} style={{ objectFit: 'cover' }} />
        <Box>
          <Typography variant="subtitle1">{item.name}</Typography>
          <Typography variant="body2">₹{item.price} x {item.quantity}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          type="number"
          size="small"
          value={item.quantity}
          onChange={handleQuantityChange}
          inputProps={{ min: 1 }}
          sx={{ width: 70 }}
        />
        <IconButton onClick={() => dispatch(removeFromCart(item.id))} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItemRow;
