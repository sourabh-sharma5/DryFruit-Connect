import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper, Avatar, Divider, Button, Chip } from '@mui/material';

const Profile = () => {
  const { user, role } = useSelector((state) => state.auth);

  if (!user) return null;

   const getRoleColor = () => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'dealer':
        return 'warning';
      default:
        return 'primary';
    }
  };

  return (
    <Box sx={{ p: 3 }}>

      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>

      <Paper elevation={3} sx={{ p: 4, maxWidth: 400 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6">
              {user.displayName || 'No Name'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Role: <Chip label={role} color={getRoleColor()} size="small" />

            </Typography>
          </Box>
        </Box>
      </Paper>

       <Divider sx={{ mb: 3 }} />

      
      {role === 'user' && (
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6">🛒 Order History</Typography>
          <Typography sx={{ mt: 1 }}>
            You can view and track your past orders here.
          </Typography>
          <Button variant="outlined" sx={{ mt: 2 }} href="/orders">
            View Orders
          </Button>
        </Paper>
      )}

      {role === 'dealer' && (
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6">🛍️ Dealer Dashboard</Typography>
          <Typography sx={{ mt: 1 }}>
            Manage your product listings and dealer-related orders here.
          </Typography>
          <Button variant="contained" color="warning" sx={{ mt: 2 }} href="/dealer-dashboard">
            Manage Products
          </Button>
        </Paper>
      )}

      {role === 'admin' && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">🛡️ Admin Access</Typography>
          <Typography sx={{ mt: 1 }}>
            You have full control to manage users, dealers, products, and monitor system operations.
          </Typography>
          <Button variant="contained" color="error" sx={{ mt: 2 }} href="/admin-dashboard">
            Go to Admin Dashboard
          </Button>
        </Paper>
      )}

    </Box>
  );
};

export default Profile;
