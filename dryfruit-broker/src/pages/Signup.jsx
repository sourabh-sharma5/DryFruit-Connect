import { useState } from "react";
import {Box, TextField, Button, Typography, Paper } from "@mui/material";
import { Link, useNavigate} from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';


function Signup() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword (auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
      email,
      userName,
      address,
      role,
      createdAt: new Date()
    });

      navigate("/");
      console.log("User signed up successfully:", user);
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>Sign Up</Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="UserName"
          fullWidth
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        
        />

        <TextField
          label="Address"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignup}
          className="mt-4"
         > 
          Sign Up
        </Button>

        <Typography className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Signup;
