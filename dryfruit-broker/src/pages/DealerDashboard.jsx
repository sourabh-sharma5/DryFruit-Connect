import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { getProductsAPI, addProductAPI } from '../app/productApi';
const DealerDashboard = () => {
  const { user, role } = useSelector((state) => state.auth);

const [product, setProduct] = useState({ name: '', price: '', category: '' });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user || !user.uid) return;
      setLoading(true);
      try {
        const productsArr = await getProductsAPI(user.uid);
        setProducts(productsArr);
      } catch (err) {
        alert("Failed to load products: " + (err.message || err));
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user]);

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addProduct = async () => {
    if (!product.name || !product.price || !product.category || !user || !user.uid) return;

     setLoading(true);
    try {
      const id = await addProductAPI(user.uid, product);
      setProducts([{ id, ...product }, ...products]);
      setProduct({ name: '', price: '', category: '' });
    } catch (err) {
      alert("Failed to add product: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dealer Dashboard
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">
          Welcome, {user?.displayName || user?.email}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          You are logged in as a <strong>{role}</strong>.
        </Typography>
        <Typography sx={{ mt: 2 }}>
           Here you can add products, manage inventory, and track orders.
        </Typography>
      </Paper>

        <Paper sx={{ p: 3, mb: 4, mt: 2 }}>
        <Typography variant="h6">Add New Product</Typography>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} mt={2}>
          <TextField
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            value={product.price}
            onChange={handleChange}
            type="number"
            fullWidth
          />
          <TextField
            label="Category"
            name="category"
            value={product.category}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" onClick={addProduct} disabled={loading}>
            Add
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={2}>
        {products.length === 0 ? (
          <Typography sx={{ ml: 2, mt : 2 }}>
            {loading ? "Loading..." :"No products added yet."}
            </Typography>
        ) : (
          products.map((prod) => (
            <Grid item xs={12} sm={6} md={4} key={prod.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">{prod.name}</Typography>
                  <Typography>Price: ₹{prod.price}</Typography>
                  <Typography>Category: {prod.category}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

    </Box>
  );
};

export default DealerDashboard;
