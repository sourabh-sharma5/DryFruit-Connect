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

      const profileDoc = doc(db, "users", user.uid);
      const profileSnap = await getDoc(profileDoc);

      if (!profileSnap.exists()) {
        throw new Error("User profile not found in Firestore");
      }
      const profileData = profileSnap.data();
      const role = profileData.role || "user";
      
      dispatch(setUser({
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || null,
        },
        role,
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
