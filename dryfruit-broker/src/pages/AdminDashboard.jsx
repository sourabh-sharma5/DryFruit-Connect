import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper,  List,
  ListItem,
  ListItemText,
  Chip,
  Divider } from '@mui/material';

  const dummyUsers = [
  { id: 1, name: 'Aniket', email: 'aniket@example.com', role: 'user' },
  { id: 2, name: 'Dealer', email: 'dealer@example.com', role: 'dealer' },
  { id: 3, name: 'Admin', email: 'admin@example.com', role: 'admin' }
];

const AdminDashboard = () => {
  const { user, role } = useSelector((state) => state.auth);
  const [users] = useState(dummyUsers);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">
          Hello Admin: {user?.displayName || user?.email}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          You are logged in as <strong>{role}</strong>.
        </Typography>
        <Typography sx={{ mt: 2 }}>
           View and manage all users, dealers, and orders.
        </Typography>
        <Typography>
           Monitor product performance and app activity.
        </Typography>
      </Paper>

         <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          All Registered Users
        </Typography>
        <List>
          {users.map((u, index) => (
            <React.Fragment key={u.id}>
              <ListItem>
                <ListItemText
                  primary={u.name}
                  secondary={u.email}
                />
                <Chip
                  label={u.role}
                  color={
                    u.role === 'admin'
                      ? 'error'
                      : u.role === 'dealer'
                      ? 'warning'
                      : 'primary'
                  }
                />
              </ListItem>
              {index < users.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
