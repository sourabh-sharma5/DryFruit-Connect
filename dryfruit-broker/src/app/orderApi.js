// import { collection, collectionGroup, addDoc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
// import { db } from "../firebase";


// export async function placeOrderToFirestore(userId, orderDetails) {
//   if (!userId) throw new Error("Missing user ID for placing order.");

//   const colRef = collection(db, "users", userId, "orders");
//   const docRef = await addDoc(colRef, {
//     ...orderDetails,
//     createdAt: serverTimestamp(),
//   });
//   return docRef.id;
// }

// export async function getUserOrders(userId) {
//   if (!userId) return [];
//   const colRef = collection(db, "users", userId, "orders");
//   const q = query(colRef, orderBy("createdAt", "desc"));
//   const snap = await getDocs(q);
//   return snap.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
// }
// export async function getAllOrders() {
//   const ordersCollectionGroupRef = collectionGroup(db, "orders");
//   const q = query(ordersCollectionGroupRef, orderBy("createdAt", "desc"));
//   const querySnapshot = await getDocs(q);
//   return querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//     userId: doc.ref.parent.parent.id, 
//   }));
// }







// import {
//   collection,
//   collectionGroup,
//   addDoc,
//   getDocs,
//   query,
//   orderBy,
//   serverTimestamp,
//   doc,
//   updateDoc,
// } from "firebase/firestore";
// import { db } from "../firebase";

// /**
//  * Place a new order document inside a user's 'orders' subcollection.
//  * Returns the generated Firestore document ID (order ID).
//  *
//  * @param {string} userId - User UID
//  * @param {object} orderDetails - Order data (cartItems, totalPrice, orderDate, etc.)
//  * @returns {Promise<string>} - Order Document ID
//  */
// export async function placeOrderToFirestore(userId, orderDetails) {
//   if (!userId) throw new Error("Missing user ID for placing order.");

//   const ordersCollection = collection(db, "users", userId, "orders");
//   const docRef = await addDoc(ordersCollection, {
//     ...orderDetails,
//     createdAt: serverTimestamp(),
//     status: "pending", // default status on creation
//   });

//   return docRef.id;
// }

// /**
//  * Fetch all order documents for a specific user, ordered by most recent.
//  *
//  * @param {string} userId - User UID
//  * @returns {Promise<Array>} - Array of order objects with Firestore document data + id
//  */
// export async function getUserOrders(userId) {
//   if (!userId) return [];

//   const ordersCollection = collection(db, "users", userId, "orders");
//   const ordersQuery = query(ordersCollection, orderBy("createdAt", "desc"));
//   const querySnapshot = await getDocs(ordersQuery);

//   return querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
// }

// /**
//  * Fetch all orders across all users, ordered by most recent.
//  * Uses Firestore collection group query for 'orders' subcollections.
//  * Includes userId extracted from parent document reference path.
//  *
//  * @returns {Promise<Array>} - Array of orders with id, data, and userId
//  */
// export async function getAllOrders() {
//   const ordersGroup = collectionGroup(db, "orders");
//   const ordersQuery = query(ordersGroup, orderBy("createdAt", "desc"));
//   const querySnapshot = await getDocs(ordersQuery);

//   return querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//     userId: doc.ref.parent.parent.id, // 'orders' collection's parent = user document id
//   }));
// }

// /**
//  * Update the status field of an order document.
//  *
//  * @param {string} userId - User UID (required to construct document path)
//  * @param {string} orderId - Order document ID
//  * @param {string} status - New status (e.g., 'shipped', 'canceled')
//  * @returns {Promise<void>}
//  */
// export async function updateOrderStatus(userId, orderId, status) {
//   if (!userId || !orderId) throw new Error("User ID and Order ID are required.");

//   const orderDocRef = doc(db, "users", userId, "orders", orderId);
//   await updateDoc(orderDocRef, { status });
// }





import axiosClient from "./axiosClient";

/**
 * Place a new order for a user.
 * @param {string} userId - The ID of the user placing the order.
 * @param {object} orderData - The order details (cartItems, totalPrice, orderDate, etc.).
 * @returns {Promise<string>} - The new order ID.
 */
export async function placeOrderAPI(userId, orderData) {
  const response = await axiosClient.post(`/orders/${userId}`, orderData);
  return response.data.orderId;  // The backend returns { orderId: "..." }
}

/**
 * Retrieve all orders for a specific user.
 * @param {string} userId - The user ID.
 * @returns {Promise<Array>} - Array of order objects for the user.
 */
export async function getUserOrdersAPI(userId) {
  const response = await axiosClient.get(`/orders/user/${userId}`);
  return response.data.orders;  // Backend returns { orders: [...] }
}

/**
 * Retrieve all orders (Admin access) with optional filters.
 * @param {object} params - Filtering and pagination parameters (e.g., status, page, pageSize).
 * @returns {Promise<Array>} - Array of all orders matching the filters.
 */
export async function getAllOrdersAPI(params = {}) {
  const response = await axiosClient.get("/orders", { params });
  return response.data.orders;
}

/**
 * Update the status of an order for a user (Admin access).
 * @param {string} userId - The user ID owning the order.
 * @param {string} orderId - The order ID.
 * @param {string} status - The new status (e.g., "pending", "shipped", "canceled").
 * @returns {Promise<object>} - The updated order data.
 */
export async function updateOrderStatusAPI(userId, orderId, status) {
  const response = await axiosClient.patch(`/orders/${userId}/${orderId}/status`, { status });
  return response.data;
}
