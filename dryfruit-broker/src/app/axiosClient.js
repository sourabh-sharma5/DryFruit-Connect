import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosClient = axios.create({
  baseURL: "https://user-detail-1bab6-default-rtdb.firebaseio.com/api", 
  timeout: 10000,
});

axiosClient.interceptors.request.use(async config => {
  const auth = getAuth();
  if (auth.currentUser) {
    const token = await auth.currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, err => Promise.reject(err));

export default axiosClient;




