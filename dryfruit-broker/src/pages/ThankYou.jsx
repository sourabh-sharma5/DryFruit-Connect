import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ThankYou = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!order);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (order) { 
      setLoading (false);
      return;

    }
    if (!user || !user.uid) {
      setLoading(false);
      return;
    }

    const fetchLatestOrder = async () => {
      try {
        setLoading(true);
        const ordersRef = collection(db, "users", user.uid, "orders");
        const q = query(ordersRef, orderBy("createdAt", "desc"), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setOrder(null);
        } else {
          const docSnap = querySnapshot.docs[0];
          setOrder({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        setError("Failed to load your order details.");
        console.error(err);
        
      } finally {
        setLoading(false);
      }
    };

    fetchLatestOrder();
  }, [user, order]);


  if (!user) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6">Loading your order details...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, textAlign: "center", maxWidth:500, mx:"auto" }}>
      <Paper sx = {{p : 4, mb :3}}>
      <Typography variant="h3" gutterBottom>
        Thank You!
      </Typography>
      <Typography variant="h6" mb={3}>
        Your order was placed successfully.
      </Typography>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      {order ? (
        <>
           <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              <strong>Order Number:</strong>{" "}
              <span style={{ color: "#1976d2" }}>{order.id}</span>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Placed:{" "}
              {order.orderDate
                ? order.orderDate
                : order.createdAt?.toDate
                ? order.createdAt.toDate().toLocaleString()
                : "Unknown"}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Order Summary:</Typography>
            {order.cartItems?.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mx: 2,
                  my: 1,
                }}
              >
                <Typography>
                  {item.name} × {item.quantity}
                </Typography>
                <Typography>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total Paid: <strong>₹{order.totalPrice?.toFixed(2)}</strong>
            </Typography>
          </>
        ) : (
          <Typography>No recent order found.</Typography>
        )}
      </Paper>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ mt: 2 }}
      >
        Back to Home
      </Button>
      <Button
        variant="outlined"
        component={Link}
        to="/orders"
        sx={{ mt: 2, ml: 2 }}
      >
        See Order History
      </Button>
    </Box>
  );
};

export default ThankYou;
