import {
  collection,
  collectionGroup,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";


export async function placeOrderToFirestore(userId, orderDetails) {
  if (!userId) throw new Error("Missing user ID for placing order.");

  const ordersCollection = collection(db, "users", userId, "orders");
  const docRef = await addDoc(ordersCollection, {
    ...orderDetails,
    createdAt: serverTimestamp(),
    status: "pending",
  });

  return docRef.id;
}


export async function getUserOrders(userId) {
  if (!userId) return [];

  const ordersCollection = collection(db, "users", userId, "orders");
  const ordersQuery = query(ordersCollection, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(ordersQuery);

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}


export async function getAllOrders() {
  const ordersGroup = collectionGroup(db, "orders");
  const ordersQuery = query(ordersGroup, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(ordersQuery);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    userId: doc.ref.parent.parent.id,
  }));
}


export async function updateOrderStatus(userId, orderId, status) {
  if (!userId || !orderId) throw new Error("User ID and Order ID are required.");

  const orderDocRef = doc(db, "users", userId, "orders", orderId);
  await updateDoc(orderDocRef, { status });
}
