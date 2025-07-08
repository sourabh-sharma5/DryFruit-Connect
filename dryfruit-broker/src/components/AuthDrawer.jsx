import {Box, Drawer, Typography, TextField, IconButton, InputAdornment, Button, Divider} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import UserNameIcon from "@mui/icons-material/Person";
import AddressIcon from "@mui/icons-material/LocationOn";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
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

  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate("/");
  };

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = () => {
    if (isLogin) {
      console.log("Logging in with:", email, password);
    } else {
      console.log("Signing up with:", email, userName, address, password);
    }
  };

  return (
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
                sx={{ color: "maroon", mb: 2, textAlign: "right" }}
              >
                Forgot Password?
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
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
  );
};

export default AuthDrawer;
