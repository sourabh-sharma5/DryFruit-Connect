// import React, {useState} from "react";
// import { TextField, Button, Snackbar, Alert } from "@mui/material";
// import { useLoginHandler } from "../hooks/useLoginHandler";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useState } from "react";
// import { auth, db } from "../../firebase";
// import {doc, getDoc } from "firebase/firestore";
// import { useLoginHandler } from "../hooks/useLoginHandler";

// export default function LoginForm({ onSuccess }) {
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleLogin = async () => {
//     try {
//       const { user } = await signInWithEmailAndPassword(auth, formData.email, formData.password);
//       const profileRef = doc(db, "users", user.uid);
//       const profileSnap = await getDoc(profileRef);
//       let role = "user"; 

//       if (profileSnap.exists()) {
//         const data = profileSnap.data();
//         role = data.role || "user";
//       }
       
//       onSuccess(
//         {
//           uid: user.uid,
//           email: user.email,
//           displayName: user.displayName || null,
//         },
//         role
//       );
//     }
      
//      catch (err) {
//       console.error("Login error", err);
//     }
//   };

//   return (
//     <>
//       <TextField name="email" label="Email" onChange={handleChange}  value={formData.email} margin="normal" fullWidth />
//       <TextField name="password" label="Password" type="password" onChange={handleChange}  value={formData.password} margin="normal" fullWidth />
//       <Button variant="contained" onClick={handleLogin}>Login</Button>
//     </>
//   );
// }





import React, { useState } from "react";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { useLoginHandler } from "../../hooks/useLoginHandler";

const LoginForm = ({ onClose }) => {
  const login = useLoginHandler();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  
  const handleSubmit = async () => {
    // const { email, password } = formData;

    // if (!email || !password) {
    //   setSnack({ open: true, message: "Please enter email and password.", severity: "warning" });
    //   return;
    // }

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
