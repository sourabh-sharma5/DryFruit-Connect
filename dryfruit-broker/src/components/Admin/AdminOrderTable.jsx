import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputBase,
  TablePagination,
  Chip,
} from "@mui/material";

import {
  collectionGroup,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase"; 

const ORDER_STATUSES = ["pending", "shipped", "canceled"];

const AdminOrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const ordersGroup = collectionGroup(db, "orders");
        const q = query(ordersGroup, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          userId: doc.ref.parent.parent.id, 
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error("Failed to load orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  
  const filteredOrders = useMemo(() => {
    const lowerSearch = search.toLowerCase().trim();

    return orders.filter((order) => {
      const matchesSearch =
        order.userId?.toLowerCase().includes(lowerSearch) ||
        order.id?.toLowerCase().includes(lowerSearch) ||
        !lowerSearch;
      const matchesStatus = !statusFilter || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  
  const paginatedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  
  const handleStatusChange = async (orderId, userId, newStatus) => {
    if (!userId || !orderId) {
      alert("Invalid user or order ID");
      return;
    }

    setLoading(true);
    try {
      const orderDocRef = doc(db, "users", userId, "orders", orderId);
      await updateDoc(orderDocRef, { status: newStatus });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update order status: " + (error.message || ""));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <Paper sx={{ p: 2 }}>
      <InputBase
        placeholder="Search order/user ID…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2, px: 1, bgcolor: "#f5f5f5", borderRadius: 1, width: 300 }}
        startAdornment={
          <span role="img" aria-label="search">
            🔍
          </span>
        }
        inputProps={{ "aria-label": "search orders" }}
      />
      <Select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        displayEmpty
        size="small"
        sx={{ ml: 2, mb: 2, minWidth: 160 }}
        inputProps={{ "aria-label": "filter by status" }}
      >
        <MenuItem value="">All statuses</MenuItem>
        {ORDER_STATUSES.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>

      <TableContainer>
        <Table size="small" aria-label="admin orders table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Change Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => {
                let formattedDate = "";

                if (order.orderDate) {
                  formattedDate = order.orderDate;
                } else if (order.createdAt instanceof Timestamp) {
                  formattedDate = order.createdAt.toDate().toLocaleString();
                } else if (
                  order.createdAt &&
                  typeof order.createdAt.seconds === "number"
                ) {
                  formattedDate = new Date(
                    order.createdAt.seconds * 1000
                  ).toLocaleString();
                }

                return (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.userId}</TableCell>
                    <TableCell>₹{(order.totalPrice ?? 0).toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status || "pending"}
                        color={
                          order.status === "shipped"
                            ? "success"
                            : order.status === "canceled"
                            ? "error"
                            : "warning"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>
                      <Select
                        value={order.status || "pending"}
                        size="small"
                        onChange={(e) =>
                          handleStatusChange(order.id, order.userId, e.target.value)
                        }
                        aria-label={`Change status for order ${order.id}`}
                      >
                        {ORDER_STATUSES.map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
};

export default AdminOrderTable;

