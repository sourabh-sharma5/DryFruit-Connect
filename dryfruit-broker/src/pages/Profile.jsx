import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Typography, Paper, Avatar, Divider, Button, Chip, Stack
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const ROLE_META = {
  admin: { color: 'error', label: "Admin" },
  dealer: { color: 'warning', label: "Dealer" },
  user: { color: 'primary', label: "User" },
};
const PROFILE_BG = "linear-gradient(135deg, #fffbe7 40%, #fceabb 80%, #fae6e7 100%)";

const Profile = () => {
  const { user, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) return null;

  const roleMeta = ROLE_META[role] || ROLE_META.user;

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <Paper
        elevation={6}
        sx={{
          width: 390,
          bgcolor: 'white',
          borderRadius: 5,
          overflow: 'hidden',
          p: 0,
          boxShadow: 6,
        }}
      >
        
        <Box
          sx={{
            bgcolor: PROFILE_BG,
            height: 100,
            px: 2,
            display: 'flex',
            alignItems: 'center',
            position: "relative",
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              border: '4px solid white',
              fontSize: 38,
              position: 'absolute',
              top: 50,
              left: 24,
              bgcolor: `${roleMeta.color}.main`,
              zIndex: 2,
            }}
          >
            {user.displayName
              ? user.displayName.charAt(0).toUpperCase()
              : user.email.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flexGrow: 1 }} />
          <Stack sx={{ position: 'absolute', top: 60, right: 30 }}>
            <Chip
              label={roleMeta.label}
              color={roleMeta.color}
              variant="filled"
              size="small"
              sx={{ fontWeight: "bold", fontSize: 16, mb: 0.5 }}
            />
          </Stack>
        </Box>
        <Box sx={{ p: 4, pt: 6 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.6, mt: 1 }}>
            {user.displayName }
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, wordBreak: "break-all" }}>
            {user.email}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>Role:</Typography>
            <Chip label={roleMeta.label} color={roleMeta.color} size="small" sx={{ fontWeight: 'bold' }} />
          </Stack>
          
          <Divider sx={{ mb: 3 }} />
          {role === 'user' && (
            <Box>
              <Typography variant="h6" mb={.5}>🛒 Order History</Typography>
              <Typography fontSize={15} color="text.secondary" sx={{ mb: 1 }}>
                View and track your past orders.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ mt: 1, fontWeight: 700, borderRadius: 2 }}
                component={Link}
                to="/orders"
              >
                View Orders
              </Button>
            </Box>
          )}
          {role === 'dealer' && (
            <Box>
              <Typography variant="h6" mb={.5}>🛍️ Dealer Dashboard</Typography>
              <Typography fontSize={15} color="text.secondary" sx={{ mb: 1 }}>
                Manage your products and dealer orders.
              </Typography>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                sx={{ mt: 1, fontWeight: "bold", color: "#fff", borderRadius: 2 }}
                component={Link}
                to="/dealer-dashboard"
              >
                Manage Products
              </Button>
            </Box>
          )}
          {role === 'admin' && (
            <Box>
              <Typography variant="h6" mb={.5}>🛡️ Admin Access</Typography>
              <Typography fontSize={15} color="text.secondary" sx={{ mb: 1 }}>
                Manage users, dealers, products, and monitor the system.
              </Typography>
              <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ mt: 1, fontWeight: "bold", borderRadius: 2 }}
                component={Link}
                to="/admin-dashboard"
              >
                Go to Admin Dashboard
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
