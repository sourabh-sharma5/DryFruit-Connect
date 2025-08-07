import React, { useState } from "react";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { useLoginHandler } from "../../hooks/useLoginHandler";

const LoginForm = ({ onClose }) => {
  const login = useLoginHandler();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  
  const handleSubmit = async () => {
    
    try {
      
      await login({ formData });

      setSnack({ open: true, message: "Login successful!", severity: "success" });

      
      if (onClose) onClose();
    } catch (err) {
      setSnack({ open: true, message: err.message || "Login failed.", severity: "error" });
    }
  };


  const handleCloseSnack = () => setSnack({ ...snack, open: false });

  return (
    <>
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        autoComplete="email"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        autoComplete="current-password"
      />
      <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
        Login
      </Button>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={snack.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginForm;
