import { AppBar, Toolbar, Typography, Box, InputBase, IconButton, MenuItem, Select, Drawer, Avatar, Container } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AuthDrawer from './AuthDrawer';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [authDrawerOpen, setAuthDrawerOpen] = useState(false);
  const [drawerOpen, setDraweropen] = useState(false);

  
  const getInitials = (name = '') => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

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
            <Select defaultValue="all" size="small">
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="almond">Almond</MenuItem>
              <MenuItem value="cashew">Cashew</MenuItem>
            </Select>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#f0f0f0',
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
            <IconButton component={Link} to="/cart">
              <ShoppingCart />
            </IconButton>

            <IconButton onClick={() => setAuthDrawerOpen(true)}>
              {user?.photoURL ? (
                <Avatar src={user.photoURL} />
              ) : (
                <Avatar>{getInitials(user?.name || 'U')}</Avatar>
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
          <MenuItem component={Link} to="/about" onClick={() => setNavDrawerOpen(false)}>
            About
          </MenuItem>
          <MenuItem component={Link} to="/contact" onClick={() => setNavDrawerOpen(false)}>
            Contact
          </MenuItem>
        </Box>
      </Drawer>

      
      <AuthDrawer open={authDrawerOpen} onClose={() => setAuthDrawerOpen(false)} />
    </AppBar>
  );
};

export default Navbar;