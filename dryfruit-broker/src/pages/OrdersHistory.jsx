import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Divider, Container, CircularProgress,
  Button, ToggleButtonGroup, ToggleButton, TextField
} from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserOrdersAPI } from "../app/orderApi";
import { Timestamp } from "firebase/firestore";

function formatDate(tsOrStr) {
  if (!tsOrStr) return "-";
  
  if (tsOrStr instanceof Timestamp) return tsOrStr.toDate().toLocaleString();
  if (typeof tsOrStr === "string") return tsOrStr;
  return String(tsOrStr);
}

const ORDERS_PER_PAGE = 5;

const OrdersHistory = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc"); 
  const [dateFilter, setDateFilter] = useState(""); 
  const [visibleCount, setVisibleCount] = useState(ORDERS_PER_PAGE);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const fetched = await getUserOrders(user.uid);
        setOrders(fetched);
      } catch (err) {
        setError("Failed to load orders.");
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) return <Navigate to="/login" />;
  if (orders === null)
    return (
      <Container sx={{ py: 5, textAlign: "center" }}>
        <CircularProgress />
        <Typography mt={2}>Loading your orders...</Typography>
      </Container>
    );

  
  let filteredOrders = orders;
  if (dateFilter)
    filteredOrders = orders.filter(order => {
      
      const dStr =
        order.orderDate ||
        (order.createdAt && formatDate(order.createdAt));
      
      if (!dStr) return false;
      return dStr.startsWith(dateFilter);
    });

  
  filteredOrders = filteredOrders.slice().sort((a, b) => {
    let tsA = a.createdAt?.toMillis?.() || new Date(a.orderDate).getTime() || 0;
    let tsB = b.createdAt?.toMillis?.() || new Date(b.orderDate).getTime() || 0;
    return sortOrder === "desc" ? tsB - tsA : tsA - tsB;
  });


  const shownOrders = filteredOrders.slice(0, visibleCount);

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        🧾 My Order History
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      <Box sx={{ mb: 2, display: "flex", gap: 2, alignItems: "center" }}>
        <ToggleButtonGroup
          value={sortOrder}
          exclusive
          onChange={(_, v) => v && setSortOrder(v)}
          size="small"
        >
          <ToggleButton value="desc">Newest</ToggleButton>
          <ToggleButton value="asc">Oldest</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          type="date"
          size="small"
          label="Filter by date"
          InputLabelProps={{ shrink: true }}
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
        />
      </Box>

      {shownOrders.length === 0 ? (
        <Typography>You have no matching orders.</Typography>
      ) : (
        shownOrders.map((order, idx) => (
          <Paper key={order.id} elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="h6">Order #{orders.length - idx}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Placed on: {formatDate(order.orderDate || order.createdAt)}
            </Typography>
            <Divider sx={{ my: 2 }} />
            {order.cartItems && order.cartItems.length > 0 ? (
              order.cartItems.map(item => (
                <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography>{item.name} × {item.quantity}</Typography>
                  <Typography>₹{(item.price * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))
            ) : (
              <Typography>No items</Typography>
            )}
            <Divider sx={{ my: 1 }} />
            <Typography fontWeight="bold">
              Total: ₹{order.totalPrice?.toFixed(2)}
            </Typography>
          </Paper>
        ))
      )}

      {visibleCount < filteredOrders.length && (
        <Box textAlign="center">
          <Button onClick={() => setVisibleCount(v => v + ORDERS_PER_PAGE)} variant="outlined">
            Load More
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default OrdersHistory;
