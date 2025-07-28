import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { setUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export function useLoginHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const login = async ({ email, password }) => {
    try {
    
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      const profileRef = doc(db, "users", user.uid);
      const profileSnap = await getDoc(profileRef);

      if (!profileSnap.exists()) {
        throw new Error("User profile not found in Firestore");
      }
      const profileData = profileSnap.data();

      
      dispatch(setUser({
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || null,
        },
        role: profileData.role || "user",
      }));

    
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

    } catch (error) {

      throw error;
    }
  };

  return login;
}
