import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


export async function getAllUsersAPI() {
  const usersCollection = collection(db, "users");
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function updateUserAPI(userId, updatedFields) {
  if (!userId) throw new Error("User ID is required");
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, updatedFields);
}


export async function deleteUserAPI(userId) {
  if (!userId) throw new Error("User ID is required");
  const userDocRef = doc(db, "users", userId);
  await deleteDoc(userDocRef);
}


export async function sendPasswordResetAPI(email) {
  if (!email) throw new Error("Email is required");
  const auth = getAuth();
  await sendPasswordResetEmail(auth, email);
}


export async function getUserProfile(uid) {
  if (!uid) return null;
  const userDocRef = doc(db, "users", uid);
  const snap = await getDoc(userDocRef);
  return snap.exists() ? snap.data() : null;
}


export async function saveUserProfile(uid, profileData) {
  if (!uid) return;
  const userDocRef = doc(db, "users", uid);
  await setDoc(userDocRef, profileData, { merge: true });
}


export async function updateUserProfile(uid, updatedFields) {
  if (!uid) return;
  const userDocRef = doc(db, "users", uid);
  await updateDoc(userDocRef, updatedFields);
}
