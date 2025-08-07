import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
  InputBase,
  TablePagination,
  Tooltip,
  Box,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";

import {
  getAllUsersAPI,
  updateUserAPI,
  deleteUserAPI,
  sendPasswordResetAPI,
} from "../../app/userApi";

const ROLES = ["user", "dealer", "admin"];

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersList = await getAllUsersAPI();
        setUsers(usersList);
      } catch (error) {
        console.error("Failed to load users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  
  const filteredUsers = useMemo(() => {
    const lowerSearch = search.toLowerCase().trim();
    return users.filter(
      (u) =>
        (u.userName?.toLowerCase().includes(lowerSearch) ||
          u.email?.toLowerCase().includes(lowerSearch)) &&
        (lowerSearch.length > 0 || true)
    );
  }, [users, search]);

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  
  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserAPI(userId, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (error) {
      alert("Failed to update role: " + (error.message || ""));
    }
  };


  const handleResetPassword = async (user) => {
    try {
      await sendPasswordResetAPI(user.email);
      alert(`Password reset email sent to ${user.email}`);
    } catch (error) {
      alert("Failed to send reset email: " + (error.message || ""));
    }
  };

  
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUserAPI(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (error) {
      alert("Failed to delete user: " + (error.message || ""));
    }
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
        <Table size="small" aria-label="admin users table">
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
                    {ROLES.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
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
                    <IconButton
                      onClick={() => handleDeleteUser(user.id)}
                      color="error"
                    >
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
      </TableContainer>
    </Paper>
  );
};

export default AdminUserTable;

