import { createSlice } from '@reduxjs/toolkit';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase'; // Make sure you have the db exported

const userFromStorage = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: userFromStorage || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    loginSuccess(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },

  
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },

    
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('cartItems');
    },
  },
});

export const { loginSuccess, setUser, logout } = authSlice.actions;
export default authSlice.reducer;

