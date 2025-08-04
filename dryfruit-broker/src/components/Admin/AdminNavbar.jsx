import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Products from "../../pages/Products";
const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: "grey.900" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#fff" }}>
          Admin Panel
        </Typography>
        <Button color="inherit" component={Link} to="/admin-dashboard">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/products">
          Products
        </Button>
        <Button color="inherit" component={Link} to="/admin-dashboard/orders">
          Orders
        </Button>
        <Button color="inherit" component={Link} to="/admin">
          Users
        </Button>
        <Button color="inherit" onClick={() => navigate("/")}>
          Exit Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
