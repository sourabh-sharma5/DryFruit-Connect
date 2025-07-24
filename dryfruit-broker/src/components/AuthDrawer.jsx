import {Box, Drawer, Typography, TextField, IconButton, InputAdornment, Button, Divider, Snackbar, Alert} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import UserNameIcon from "@mui/icons-material/Person";
import AddressIcon from "@mui/icons-material/LocationOn";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../features/auth/authSlice";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthDrawer = ({ open, onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  const toggleMode = () => setIsLogin(!isLogin);
  const handleCloseSnack = () => setSnack({ ...snack, open: false });
  const resetFields = () => {
    setEmail("");
    setPassword("");
    setUserName("");
    setAddress("");
  };

  const handleAuth = async () => {
    try {
      if (isLogin) {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const profileRef = doc(db, "users", userCred.user.uid);

        const profileSnap = await getDoc(profileRef);

        if (!profileSnap.exists()) throw new Error ("User profile dose not exist in Firestore");

        const profileData = profileSnap.data();
        dispatch(setUser({ 
          user : {
          uid: userCred.user.uid,
         email: userCred.user.email,
         displayName: userCred.user.displayName || null,
        },
        role : profileData.role || "user",
      }));
        setSnack({ open: true, message: "Login successful!", severity: "success" });

        switch (profileData.role) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "dealer":
            navigate("/dealer-dashboard");
            break;
          default:
            navigate("/profile");
            break;
        }

      } else {
        
        if (!userName || !address) {
          return setSnack({ open: true, message: "Please fill all fields", severity: "warning" });
        }

        const userCred = await createUserWithEmailAndPassword(auth, email, password);

        
        const newProfile = {
          email,
          userName,
          address,
          role: "user",  
          createdAt: new Date(),
        };

        await setDoc(doc(db, "users", userCred.user.uid), newProfile);

        dispatch(setUser({
          user: {
            uid: userCred.user.uid,
            email: userCred.user.email,
            displayName: userCred.user.displayName || null,
          },
          role: newProfile.role,
        }));

        setSnack({ open: true, message: "Signup successful!", severity: "success" });
        navigate("/profile");
      }

      resetFields();
      onClose();

    } catch (error) {
      console.error("Auth error:", error.message);
      setSnack({
        open: true,
        message: error.message || "Something went wrong",
        severity: "error"
      });
    }
  };

       

  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate("/");
  };

  return (
    <>
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 3, position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 3,
            fontWeight: 700,
            color: "maroon",
            border: "1px solid maroon",
            px: 3,
            py: 1,
            borderRadius: "50px",
            width: "fit-content",
            mx: "auto",
          }}
        >
          {user ? "My Account" : isLogin ? "Login!" : "Sign Up!"}
        </Typography>

        {!user ? (
          <>
            <TextField
              fullWidth
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            {!isLogin && (
              <>
                <TextField
                  fullWidth
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <UserNameIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AddressIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}

            <TextField
              fullWidth
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />

            {isLogin && (
              <Typography
                variant="body2"
                sx={{ color: "maroon", mb: 2, textAlign: "right", cursor:"pointer" }}
              >
                Forgot Password?
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              onClick={handleAuth}
              sx={{
                bgcolor: "maroon",
                color: "#fff",
                borderRadius: "30px",
                py: 1.2,
                fontWeight: "bold",
                mb: 2,
                "&:hover": { bgcolor: "#8B0000" },
              }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <Divider />

            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              {isLogin ? "Not Registered?" : "Already have an account?"}{" "}
              <Button
                onClick={toggleMode}
                sx={{ color: "maroon", fontWeight: "bold" }}
              >
                {isLogin ? "Sign Up" : "Login"}
              </Button>
            </Typography>
          </>
        ) : (
          <>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => {
                navigate("/profile");
                onClose();
              }}
            >
              Go to Profile
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => {
              navigate("/orders");
              onClose();
                    }}
           >
              My Orders
             </Button>
            <Button
              fullWidth
              color="error"
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
            

          </>
        )}
      </Box>
    </Drawer>
    <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnack} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
      
  );
};

export default AuthDrawer;
