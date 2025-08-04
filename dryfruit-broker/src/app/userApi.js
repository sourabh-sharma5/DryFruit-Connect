// import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import { sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "../firebase";

// export async function getAllUsers() {
//   const usersRef = collection(db, "users");
//   const snap = await getDocs(usersRef);
//   return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// }

// export async function updateUser(userId, changes) {
//   const userRef = doc(db, "users", userId);
//   await updateDoc(userRef, changes);
// }

// export async function deleteUserAccount(userId) {
//   const userRef = doc(db, "users", userId);
//   await deleteDoc(userRef);
  
// }

// export async function sendPasswordReset(email) {
//   try {
//     await sendPasswordResetEmail(auth, email);
//   } catch (error) {
//     throw error;
//   }
// }





import axiosClient from "./axiosClient";

/**
 * Fetch all users (Admin only).
 * @returns {Promise<Array>} Array of user objects.
 */
export async function getAllUsersAPI() {
  const res = await axiosClient.get("/users");
  return res.data.users;
}

/**
 * Update user details such as role or status.
 * @param {string} userId - User ID to update.
 * @param {object} changes - Object with fields to update, e.g., { role: 'admin' }
 */
export async function updateUserAPI(userId, changes) {
  const res = await axiosClient.patch(`/users/${userId}`, changes);
  return res.data;
}

/**
 * Delete a user account (Admin only).
 * @param {string} userId - ID of user to delete.
 */
export async function deleteUserAPI(userId) {
  const res = await axiosClient.delete(`/users/${userId}`);
  return res.data;
}

/**
 * Send password reset email to a user.
 * @param {string} email - Email of the user.
 */
export async function sendPasswordResetAPI(email) {
  const res = await axiosClient.post("/auth/password-reset", { email });
  return res.data;
}
