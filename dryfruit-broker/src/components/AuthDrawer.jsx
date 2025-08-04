
import React, { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import UserNameIcon from "@mui/icons-material/Person";
import AddressIcon from "@mui/icons-material/LocationOn";
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, logout } from "../features/auth/authSlice";
import { syncGuestCartOnLogin } from "../features/cart/cartSlice";
import { auth, db } from "../firebase";

const AuthDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems); // Guest cart
  const { user } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setUserName("");
    setAddress("");
  };

  const toggleMode = () => setIsLogin((prev) => !prev);
  const handleCloseSnack = () => setSnack({ ...snack, open: false });

  const handleAuth = async () => {
    try {
      let userCred, profileData, role, uid;

      if (isLogin) {
        
        userCred = await signInWithEmailAndPassword(auth, email, password);
        uid = userCred.user.uid;

        
        const profileRef = doc(db, "users", uid);
        const profileSnap = await getDoc(profileRef);

        if (!profileSnap.exists())
          throw new Error("User profile does not exist in Firestore");

        profileData = profileSnap.data();
        role = profileData.role || "user";

        
        dispatch(
          setUser({
            user: {
              uid,
              email: userCred.user.email,
              displayName: userCred.user.displayName || null,
            },
            role,
          })
        );

        
        if (cartItems.length) {
          await dispatch(syncGuestCartOnLogin(uid, cartItems));
        }

        
        if (role === "admin") navigate("/admin-dashboard");
        else if (role === "dealer") navigate("/dealer-dashboard");
        else navigate("/profile");
      } else {
        
        if (!userName || !address) {
          setSnack({ open: true, message: "Please fill all fields", severity: "warning" });
          return;
        }

        userCred = await createUserWithEmailAndPassword(auth, email, password);
        uid = userCred.user.uid;

        
        const newProfile = {
          email,
          userName,
          address,
          role: "user",
          createdAt: new Date(),
        };
        await setDoc(doc(db, "users", uid), newProfile);

        dispatch(
          setUser({
            user: {
              uid,
              email: userCred.user.email,
              displayName: userCred.user.displayName || null,
            },
            role: newProfile.role,
          })
        );

        
        if (cartItems.length) {
          await dispatch(syncGuestCartOnLogin(uid, cartItems));
        }

        navigate("/profile");
      }

      resetFields();
      onClose();

      setSnack({
        open: true,
        message: `${isLogin ? "Login" : "Signup"} successful!`,
        severity: "success",
      });
    } catch (error) {
      console.error("Auth error:", error.message);
      setSnack({
        open: true,
        message: error.message || "Something went wrong",
        severity: "error",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error.message);
      setSnack({ open: true, message: error.message, severity: "error" });
    }
  };

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box sx={{ width: 350, p: 3, position: "relative" }}>
          <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
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
                  sx={{ color: "maroon", mb: 2, textAlign: "right", cursor: "pointer" }}
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
                <Button onClick={toggleMode} sx={{ color: "maroon", fontWeight: "bold" }}>
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
        <Alert onClose={handleCloseSnack} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AuthDrawer;
