import { AppBar, Toolbar, Grid, Typography, Box, InputBase, IconButton, MenuItem, Select, Drawer, Avatar, Container, Menu, Badge, FormControl, InputLabel, Divider, List, ListItem, ListItemText } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { ShoppingCart } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthDrawer from './AuthDrawer';
import ProductDetail from '../pages/ProductDetail';
import Catalogue from '../pages/Catalogue';
import Home from '../pages/Home';
import uploadDummyData from '../utils/uploadDummyData';

const Navbar = () => {
  const { user, role } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);


  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [authDrawerOpen, setAuthDrawerOpen] = useState(false);
 

  
  const navigate = useNavigate();


  const [category, setCategory] = useState('All');
 // const [view, setView] = useState('grid');
  const categories = ['All', ...Array.from(new Set(uploadDummyData.map(p => p.category)).values())];
  // const filtered = uploadDummyData
  //     .filter(product => (category === 'All' ||  product.category === category)
  //     );
      
      const getInitials = (name, email) => {
        if (name && name.length) {
      return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };  if (email) return email [0].toUpperCase();
  return 'U';
 };   
  
  const roleLinks = [];
  if (role === 'admin') {
    roleLinks.push(
      <MenuItem key="admin" component={Link} to="/admin-dashboard" onClick={() => setNavDrawerOpen(false)}>
        Admin Dashboard
      </MenuItem>
    );
  }
  if (role === 'dealer') {
    roleLinks.push(
      <MenuItem key="dealer" component={Link} to="/dealer-dashboard" onClick={() => setNavDrawerOpen(false)}>
        Dealer Dashboard
      </MenuItem>
    );
  }
  if (user) {
    roleLinks.push(
      <MenuItem key="profile" component={Link} to="/profile" onClick={() => setNavDrawerOpen(false)}>
        My Profile
      </MenuItem>
    );
  }

  return (
    <AppBar position="sticky" color="default" sx={{ width: '100%', boxShadow: 2 }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          
          <IconButton edge="start" onClick={() => setNavDrawerOpen(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          
          <Typography
            variant="h6"
            fontWeight={700}
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            DryFruitConnect
          </Typography>

        
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              gap: 2,
              alignItems: 'center',
              flex: 1,
              ml: 4,
            }}
          >
            {/* <Select defaultValue="all" size="small">
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="almond">Almonds</MenuItem>
              <MenuItem value="cashew">Cashews</MenuItem>
              <MenuItem value="pistachio">Pistachios</MenuItem>
              <MenuItem value="walnuts">Walnuts</MenuItem>
              <MenuItem value="raisins">Raisins</MenuItem>
              <MenuItem value="dates">Dates</MenuItem>
            </Select> */}
            <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Category"
                      >
                        {categories.map((cat) => (
                          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                
                px: 2,
                borderRadius: 1,
                width: '100%',
              }}
            >
              <SearchIcon sx={{ mr: 1 }} />
              <InputBase placeholder="Search dry fruits..." fullWidth />
            </Box>
          </Box>

          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            <IconButton component={Link} to="/cart" onClick={() => setNavDrawerOpen(false)}>
              <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCart />
              </Badge>

            </IconButton>

            <IconButton onClick={() => setAuthDrawerOpen(true)}>
              {user? (
                <Avatar  >
                {getInitials(user.displayName, user.email)}
                </Avatar>

              ) : (
                <Avatar> U </Avatar>
              )}
            </IconButton>
            <AuthDrawer open={authDrawerOpen} onClose={() => setAuthDrawerOpen(false)} />
          </Box>
        </Toolbar>
      </Container>

      
      <Drawer anchor="left" open={navDrawerOpen} onClose={() => setNavDrawerOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Navigation
          </Typography>
          <MenuItem component={Link} to="/" onClick={() => setNavDrawerOpen(false)}>
            Home
          </MenuItem>
          <MenuItem component={Link} to="/products" onClick={() => setNavDrawerOpen(false)}>
            Products
          </MenuItem>
          <MenuItem component={Link} to="/catalogue" onClick={() => setNavDrawerOpen(false)}>
            Catalogue 
          </MenuItem>
          <MenuItem component={Link} to="/about" onClick={() => setNavDrawerOpen(false)}>
            About
          </MenuItem>
          <MenuItem component={Link} to="/contact" onClick={() => setNavDrawerOpen(false)}>
            Contact
          </MenuItem>
          {/* <MenuItem component={Link} to="/productdetail" onClick={() => setNavDrawerOpen(false)}>
            Product Detail
          </MenuItem> */}
          {user && <Divider sx={{ my: 1 }} />}
          {roleLinks}
          
        </Box>
      </Drawer>

      
      <AuthDrawer open={authDrawerOpen} onClose={() => setAuthDrawerOpen(false)} />
    </AppBar>
  );
};

export default Navbar;