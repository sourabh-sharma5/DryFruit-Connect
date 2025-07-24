import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebase";
import {doc, getDoc } from "firebase/firestore";

export default function LoginForm({ onSuccess }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const profileRef = doc(db, "users", user.uid);
      const profileSnap = await getDoc(profileRef);
      let role = "user"; 

      if (profileSnap.exists()) {
        const data = profileSnap.data();
        role = data.role || "user";
      }
       
      onSuccess(
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || null,
        },
        role
      );
    }
      
     catch (err) {
      console.error("Login error", err);
    }
  };

  return (
    <>
      <TextField name="email" label="Email" onChange={handleChange}  value={formData.email} margin="normal" fullWidth />
      <TextField name="password" label="Password" type="password" onChange={handleChange}  value={formData.password} margin="normal" fullWidth />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </>
  );
}
