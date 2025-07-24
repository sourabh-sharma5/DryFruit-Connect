import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishListSlice";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
 import { db } from "../firebase"; 

const ProductCardGrid = ({}) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    setProducts([
      {
        id: "1",
        name: "Premium Almonds",
        price: 399,
        image: "https://images.unsplash.com/photo-1615485737651-580c9159c89a?q=80&w=1481&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "2",
        name: "Cashew Delight",
        price: 499,
        image: "https://images.unsplash.com/photo-1649103990014-73d045082df1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "3",
        name: "Mixed Dry Fruit Pack",
        price: 899,
        image: "https://plus.unsplash.com/premium_photo-1726768984120-f476b15835f2?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ]);
  }, []);

  const isWishlisted = (productId) => wishlist.includes(productId);

  return (
    <Grid container spacing={3} sx={{ px: 4, py: 4 }}>
      {products?.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ₹{product.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<AddShoppingCartIcon />}
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </Button>

              <Tooltip title="Add to Wishlist">
                <IconButton
                  onClick={() => dispatch(toggleWishlist(product.id))}
                  color={isWishlisted(product.id) ? "error" : "default"}
                >
                  {isWishlisted(product.id) ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCardGrid;



