import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


export async function saveCartToFirestore(uid, cartItems) {
  if (!uid) return;
  await setDoc(doc(db, "carts", uid), { cartItems });
}


export async function loadCartFromFirestore(uid) {
  if (!uid) return [];
  const snap = await getDoc(doc(db, "carts", uid));
  return snap.exists() ? snap.data().cartItems : [];
}
