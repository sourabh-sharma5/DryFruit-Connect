import axiosClient from "./axiosClient";

export async function loginAPI(email, password) {
  const res = await axiosClient.post("/auth/login", { email, password });
  return res.data;
}

export async function signupAPI(userInfo) {
  const res = await axiosClient.post("/auth/signup", userInfo);
  return res.data;
}
