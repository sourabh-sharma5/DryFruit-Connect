import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";


export async function addProductAPI(uid, product) {
  const productsCollection = collection(db, "users", uid, "products");
  const docRef = await addDoc(productsCollection, {
    ...product,
    price: parseFloat(product.price),
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}


export async function getProductsAPI(uid) {
  if (!uid) return [];
  const productsCollection = collection(db, "users", uid, "products");
  const productsQuery = query(productsCollection, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(productsQuery);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}


export async function deleteProductAPI(uid, productId) {
  const productDocRef = doc(db, "users", uid, "products", productId);
  await deleteDoc(productDocRef);
}


export async function updateProductAPI(uid, productId, updatedFields) {
  const productDocRef = doc(db, "users", uid, "products", productId);
  if (updatedFields.price) {
    updatedFields.price = parseFloat(updatedFields.price);
  }
  await updateDoc(productDocRef, updatedFields);
}
