
import axiosClient from "./axiosClient";

export async function fetchCartAPI(uid) {
  if (!uid) return [];
  const res = await axiosClient.get(`/cart/${uid}`);
  return res.data.cartItems || [];
}

/**
 * Sync (overwrite) the user's cart with given items.
 * @param {string} uid - User ID
 * @param {Array} cartItems - Array of cart items
 * @returns {Promise<Array>} updated cart items array
 */
export async function syncCartAPI(uid, cartItems) {
  if (!uid) return [];
  const res = await axiosClient.post(`/cart/${uid}`, { cartItems });
  return res.data.cartItems || [];
}
