import React, { useState } from "react";
import {
  Drawer, Box, TextField, Button, Typography, MenuItem, Stack, Snackbar, Alert,
} from "@mui/material";
import { useSignupHandler } from "../../hooks/useSignupHandler";

const roles = ["user", "dealer", "admin"];

const SignupDrawer = ({ open, onClose }) => {
  const signup = useSignupHandler();

  const [form, setForm] = useState({ email: "", password: "", name: "", role: "user" });
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCloseSnack = () => setSnack({ ...snack, open: false });
  const resetForm = () => setForm({ email: "", password: "", name: "", role: "user" });

  const handleSignup = async () => {
    const { email, password, name, role } = form;
    if (!email || !password || !name || !role) {
      setSnack({
        open: true,
        message: "Please fill in all required fields.",
        severity: "warning",
      });
      return;
    }

    try {
      
      await signup({
        email,
        password,
        displayName: name, 
        role,
      });
      setSnack({ open: true, message: "Signup successful!", severity: "success" });
      resetForm();
      onClose();

    } catch (err) {
      setSnack({ open: true, message: err.message || "Signup failed", severity: "error" });
      console.error("Signup error:", err);
    }
  };

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box sx={{ width: 350, p: 3 }}>
          <Typography variant="h6" gutterBottom>Sign Up</Typography>
          <Stack spacing={2}>
            <TextField label="Name" name="name" value={form.name} onChange={handleChange} required fullWidth />
            <TextField label="Email" name="email" value={form.email} onChange={handleChange} required fullWidth />
            <TextField label="Password" name="password" value={form.password} type="password" onChange={handleChange} required fullWidth />
            <TextField
              select
              label="Select Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              fullWidth required
            >
              {roles.map((r) => (
                <MenuItem key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" onClick={handleSignup} fullWidth>
              Register
            </Button>
          </Stack>
        </Box>
      </Drawer>
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={snack.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignupDrawer;

