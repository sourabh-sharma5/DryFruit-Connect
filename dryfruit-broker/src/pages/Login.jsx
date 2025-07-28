import React, { useState } from "react";
import {Box, TextField, Button, Typography, Paper} from "@mui/material";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { setUser } from "../features/auth/authSlice";




function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const [error, setError] = useState(""); 


  const handleLogin = async () => {
  setError(""); 
    try {
     const userCredential = await signInWithEmailAndPassword (auth, email, password);

     const profileRef = doc(db, "users", userCredential.user.uid);
     const profileSnap = await getDoc(profileRef);

     if (profileSnap.exists()) {
      const data = profileSnap.data();

      dispatch(
        setUser({
         user : {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName ||  null,
        },
        role: data.role || "user",
        


        })
      );
      navigate ("/profile");
     } else {
       setError("USer Profile not found in Firestore.");

     }
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Invalid email or password.");

    }
    };
 

       return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        
        <Typography variant="h5" mb={2}>Login</Typography>
        <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
        <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />

          {error && (
          <Typography variant="body2" color="error" mt={1}>
            {error}
          </Typography>
        )}
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
