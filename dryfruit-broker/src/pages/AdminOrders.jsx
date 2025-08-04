import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAllOrdersAPI } from "../app/orderApi";

const AdminOrders = () => {
  const { user, role } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState(null);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    getAllOrders()
      .then(setOrders)
      .catch(err => {
        console.error("Error fetching all orders:", err);
        setLoadingError("Failed to load orders. Please try again later.");
        setOrders([]); 
      });
  }, []);

  
  if (!user || role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  if (orders === null) {
    
    return (
      <Container sx={{ py: 5, textAlign: "center" }}>
        <CircularProgress />
        <Typography mt={2}>Loading all orders...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        All Customer Orders
      </Typography>

      {loadingError && (
        <Typography color="error" variant="body1" mb={2}>
          {loadingError}
        </Typography>
      )}

      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        orders.map((order, index) => (
          <Paper
            key={order.id}
            elevation={3}
            sx={{ p: 3, mb: 3, borderRadius: 2 }}
          >
            <Typography variant="h6">
              Order #{index + 1} (User ID: {order.userId})
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Placed on:{" "}
              {order.orderDate
                ? order.orderDate
                : order.createdAt?.toDate
                ? order.createdAt.toDate().toLocaleString()
                : "Unknown date"}
            </Typography>
            <Divider sx={{ my: 2 }} />
            {order.cartItems && order.cartItems.length > 0 ? (
              order.cartItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>
                    {item.name} × {item.quantity}
                  </Typography>
                  <Typography>₹{(item.price * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))
            ) : (
              <Typography>No items in this order.</Typography>
            )}
            <Divider sx={{ my: 1 }} />
            <Typography fontWeight="bold">
              Total: ₹{order.totalPrice?.toFixed(2)}
            </Typography>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default AdminOrders;
