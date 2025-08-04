import React, { useEffect, useState, useMemo } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Select, MenuItem, InputBase, TablePagination, Chip
} from "@mui/material";
import { getAllOrdersAPI, updateOrderStatusAPI } from "../../app/orderApi";

const ORDER_STATUSES = ["pending", "shipped", "canceled"];

const AdminOrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getAllOrdersAPI()
      .then((data) => {
        setOrders(data);
      })
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (o) =>
        (o.userId?.toLowerCase().includes(search.toLowerCase()) ||
         o.id?.toLowerCase().includes(search.toLowerCase())) &&
        (!statusFilter || o.status === statusFilter)
    );
  }, [orders, search, statusFilter]);

  const paginatedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleStatusChange = async (id, status) => {
    await updateOrderStatusAPI(id, status);
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <Paper sx={{ p: 2 }}>
      <InputBase
        placeholder="Search order/user ID…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2, px: 1, bgcolor: "#f5f5f5", borderRadius: 1, width: 300 }}
        startAdornment={<span role="img" aria-label="search">🔍</span>}
      />
      <Select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        displayEmpty
        size="small"
        sx={{ ml: 2, mb: 2, minWidth: 160 }}
      >
        <MenuItem value="">All statuses</MenuItem>
        {ORDER_STATUSES.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
      <TableContainer>
        <Table size="small">
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
            {paginatedOrders.length ? (
              paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>₹{order.totalPrice?.toFixed(2)}</TableCell>
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
                  <TableCell>
                    {order.orderDate ||
                      order.createdAt?.toDate?.().toLocaleString() ||
                      ""}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status || "pending"}
                      size="small"
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      {ORDER_STATUSES.map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                </TableRow>
              ))
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
