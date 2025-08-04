import axiosClient from "./axiosClient";


export async function getProductsAPI(params = {}) {
  const res = await axiosClient.get("/products", { params });
  return res.data.products;
}


export async function saveProductAPI(product) {
  const res = await axiosClient.post("/products", product);
  return res.data.product;
}


export async function deleteProductAPI(productId) {
  const res = await axiosClient.delete(`/products/${productId}`);
  return res.data;
}
