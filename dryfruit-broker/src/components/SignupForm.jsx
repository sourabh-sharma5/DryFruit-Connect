import { useState } from "react";
import { Button, TextField, MenuItem, Box } from "@mui/material";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { setDoc, doc } from "firebase/firestore";

const roles = [
  { value: "user", label: "User (Customer)" },
  { value: "dealer", label: "Dealer" },
  { value: "admin", label: "Admin" },
];

export default function SignupForm({ onSuccess }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    role: "admin",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    const { email, password, displayName, role } = formData;

    if (!email || !password || !displayName) {
      alert ("Please fill all required fields.");
      return;
   }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName });

      
      await setDoc(doc(db, "users", user.uid), {
        email,
        userName: displayName,
        role,
        createdAt: new Date()
      });

       dispatch(setUser({
        user: {
          uid: user.uid,
          email: user.email,
          displayName
        },
        role
      }));
         if (onSuccess) {
        onSuccess(user, role);
      }
    
       } catch (error) {
      console.error('Signup error:', error);
      alert(error.message || "Signup failed")
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField name="displayName" label="Name" value={formData.displayName} onChange={handleChange} required fullwidth />
      <TextField name="email" label="Email" type="email" value={formData.email} onChange={handleChange} required fullwidth />
      <TextField name="password" label="Password" type="password" value={formData.password} onChange={handleChange} required fullwidth/>
      <TextField
        name="role"
        select
        label="Select Role"
        value={formData.role}
        onChange={handleChange}
        fullwidth
      >
        {roles.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}</MenuItem>
        ))}
      </TextField>
      <Button variant="contained" onClick={handleSignup} fullwidth>
        Sign Up
     </Button>
    </Box>
  );
}
