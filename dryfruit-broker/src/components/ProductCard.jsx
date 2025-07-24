import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, IconButton } from '@mui/material';
import {Add, Remove } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';
import { toast } from 'react-toastify';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);


  const handleAddToCart = (qty = 0) => {
    console.log('Adding to cart:', product.name, 'Quantity:', qty);
    const payload = { ...product, quantity: qty };
    dispatch(addToCart(payload));
    
  };
  const handlePlus = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);  
    handleAddToCart(newQty);
  };
  const handleMinus = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      handleAddToCart(newQty);
    } 
    else {
      setQuantity(0);
    }
  };
  const handleInitialAdd = (e) => {
    e.preventDefault();
    const initialQty = 1;
    setQuantity(initialQty);
    handleAddToCart(initialQty);
    toast.success(`${product.name} added to cart!`);
  } ;

return (
//   <motion.div
//   whileTap={{ scale: 0.95 }}
//   transition={{ type: 'spring', stiffness: 300 }}
// >
    <Card
      component={Link}
      to= {`/product/${product.id}`}                         
      sx={{
        width : 280,
        height: '420',
        display: 'flex',
        flexDirection: 'column',    
        justifyContent: 'felx-start',
        boxShadow: 3,
        textDecoration: 'none',
        '&:hover': {boxShadow: 6},
          transition: '0.3s',
          m: 'auto',

      }}
    >
      <CardMedia
        component="img"
        
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover',
          height: 180,
          width: '100%',
          borderBottom: '1px solid #eee',
         }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom sx={{fontWeight: 600, fontSize: 17 }}>{product.name}</Typography>

        <Typography variant="body2" color="text.secondary" sx={{height:40,overflow:'hidden', textOverflow: 'ellipsis' }}>{product.description}</Typography>
        
        <Typography variant="h6" color="maroon" sx={{mt: 1, fontWeight: 'bold'}}>₹{product.price}</Typography>
        </CardContent>
      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>

        {quantity === 0 ? (
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleInitialAdd}
          >
            Add to Cart
          </Button>
          ) : (
          <>
          <IconButton
            size="small"
            color='primary'
            onClick={(e) => {

              e.preventDefault();
              handleMinus();
            }}
            >
              <Remove />
            </IconButton>

            <Typography variant="body1" sx={{ mx: 1 }}>
              {quantity}
              </Typography>
               <IconButton
              size="small"
              color="secondary"
              onClick={(e) => {
                e.preventDefault();
                handlePlus();
              }}
            >
              <Add />
            </IconButton>
          </>
              
        )}
        </CardActions>
    
    </Card>
    // </motion.div>
  );
};

export default ProductCard;