import { configureStore } from '@reduxjs/toolkit';
//import userReducer from '../features/users/userSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import wishListReducer from '../features/wishlist/wishListSlice';

 const store = configureStore({
  reducer: {
   // users: userReducer,
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishListReducer
  },
});
export default store;