import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { setUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export function useSignupHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const signup = async ({ email, password, displayName, role }) => {
    try {
      
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      
      await updateProfile(userCred.user, { displayName });

    
      await setDoc(doc(db, "users", userCred.user.uid), {
        email,
        userName: displayName,
        role,
        createdAt: new Date(),
      });

    
      dispatch(setUser({
        user: {
          uid: userCred.user.uid,
          email: userCred.user.email,
          displayName,
        },
        role,
      }));

    
      navigate("/profile");
    } catch (error) {
      throw error;
    }
  };

  return signup;
}
