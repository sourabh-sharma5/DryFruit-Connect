import React, { useState } from "react";
import AdminNavbar from "../components/Admin/AdminNavbar";
import AdminUserTable from "../components/Admin/AdminUserTable";
import AdminOrderTable from "../components/Admin/AdminOrderTable";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { role } = useSelector((state) => state.auth);
  const [tab, setTab] = useState(0);

  
  if (role !== "admin") {
    return (
      <Box sx={{ p: 6, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Access denied. Admins only.
        </Typography>
      </Box>
    );
  }

  return (
    
      
      <Box sx={{ p: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label="Users" />
          <Tab label="Orders" />
          <Tab label="Products" />
        </Tabs>
        {tab === 0 && <AdminUserTable />}
        {tab === 1 && <AdminOrderTable />}
        {tab === 2 && (
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            Product Management coming soon!
          </Typography>
        )}
      </Box>
    
  );
};

export default AdminDashboard;
