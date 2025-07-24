import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Container,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  if (!user) return <Navigate to="/login" />;

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        🧾 My Order History
      </Typography>

      {orders.length === 0 ? (
        <Typography variant="body1">You have no previous orders.</Typography>
      ) : (
        orders.map((order, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{ p: 3, mb: 3, borderRadius: 2 }}
          >
            <Typography variant="h6">Order #{index + 1}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Placed on: {order.orderDate}
            </Typography>
            <Divider sx={{ my: 2 }} />
            {order.cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>{item.name} × {item.quantity}</Typography>
                <Typography>₹{item.price * item.quantity}</Typography>
              </Box>
            ))}
            <Divider sx={{ my: 1 }} />
            <Typography fontWeight="bold">
              Total: ₹{order.totalPrice}
            </Typography>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default OrdersHistory;
