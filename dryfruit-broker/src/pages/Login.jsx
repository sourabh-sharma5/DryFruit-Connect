import { useState } from "react";
import {Box, TextField, Button, Typography, Paper} from "@mui/material";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", email, password);
  };

  return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        
        <Typography variant="h5" mb={2}>Login</Typography>
        <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
        <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          className="mt-4">
          Login
        </Button>

        <Typography mt={2} textAlign="center">Don&apos;t have an account?{' '}
        <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>Sign up</Link>
        </Typography>
        </Paper>
        </Box>
        );
}
export default Login;
