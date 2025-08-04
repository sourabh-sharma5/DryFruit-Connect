import React, { useEffect, useState, useMemo } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Select, MenuItem, Button, InputBase, TablePagination, Tooltip,
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import { getAllUsersAPI, updateUserAPI, deleteUserAPI, sendPasswordResetAPI } from "../../app/userApi";

const ROLES = ["user", "dealer", "admin"];

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination and Search
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllUsersAPI().then(setUsers).finally(() => setLoading(false));
  }, []);

  // Filtering and Pagination
  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.userName?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleRoleChange = async (id, val) => {
    await updateUserAPI(id, { role: val });
    setUsers(users.map((u) => (u.id === id ? { ...u, role: val } : u)));
  };

  const handleResetPassword = async (user) => {
    await sendPasswordResetAPI(user.email);
    alert(`Password reset email sent to ${user.email}`);
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;
    await deleteUserAccount(id);
    setUsers(users.filter((u) => u.id !== id));
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <SearchIcon />
        <InputBase
          placeholder="Search users…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, px: 1, bgcolor: "#f5f5f5", borderRadius: 1 }}
        />
      </Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    size="small"
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    {ROLES.map((r) => (
                      <MenuItem key={r} value={r}>
                        {r}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Reset Password">
                    <IconButton onClick={() => handleResetPassword(user)}>
                      <RestartAltIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete User">
                    <IconButton onClick={() => handleDeleteUser(user.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {paginatedUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredUsers.length}
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

export default AdminUserTable;
