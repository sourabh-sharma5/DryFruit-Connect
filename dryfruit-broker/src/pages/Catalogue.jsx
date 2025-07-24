import { useState } from 'react';
import { Box, Container, Grid, Typography, MenuItem, Select, InputLabel, FormControl, ToggleButton, ToggleButtonGroup, TextField } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';

import products from '../data/products';
import ProductCard from '../components/ProductCard';
import uploadDummyData from '../utils/uploadDummyData';

AOS.init();

const Catalogue = () => {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');
  const [maxPrice, setMaxPrice] = useState(Infinity);

  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');

  const categories = ['All', ...new Set(uploadDummyData.map(p => p.category))];

  const filtered = uploadDummyData
    .filter(product => (category === 'All' ||  product.category === category)
    )
    .filter(product => product.name.toLowerCase().includes(search.toLowerCase())) 
    .filter(product => product.price <= maxPrice )  
    .sort((a, b) => {
      if (sort === 'asc') return a.price - b.price;
      if (sort === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom data-aos="fade-up">Explore Our Products</Typography>

      
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            label="Sort by"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="asc">Price: Low to High</MenuItem>
            <MenuItem value="desc">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
  <InputLabel>Max Price</InputLabel>
  <Select
    value={maxPrice}
    onChange={(e) => setMaxPrice(Number(e.target.value))}
    label="Max Price"
  >
    <MenuItem value={Infinity}>Any</MenuItem>
    <MenuItem value={500}>₹500</MenuItem>
    <MenuItem value={1000}>₹1000</MenuItem>
    <MenuItem value={2000}>₹2000</MenuItem>
  </Select>
</FormControl>


<TextField
          size="small"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(e, newView) => setView(newView)}
          size="small"
        >
          
        </ToggleButtonGroup>



      </Box>

      
      <Grid container spacing={3}>
        {filtered.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} data-aos="fade-up" display="flex" justifyContent="center">
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Catalogue;
