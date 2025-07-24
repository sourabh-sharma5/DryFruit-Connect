import { CleaningServices } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';
// import { doc, setDoc, getDoc } from 'firebase/firestore';
// import { db } from '../../firebase';


// export const saveCartToFirebase = createAsyncThunk(
//   'cart/saveToFirebase',
//   async ({ uid, cartItems }) => {
//     if (!uid) return;
//     await setDoc(doc(db, 'carts', uid), { cartItems });
//   }
// );


// export const loadCartFromFirebase = createAsyncThunk(
//   'cart/loadFromFirebase',
//   async (uid) => {
//     const docRef = doc(db, 'carts', uid);
//     const snap = await getDoc(docRef);
//     return snap.exists() ? snap.data().cartItems : [];
//   }
// );


const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action)  {
      const item = action.payload;
       console.log("item",item)
      const existItem = state.cartItems.find((i)=> i.id === item.id);
      if (existItem) {
        existItem.quantity = item.quantity;
        
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          state.cartItems = state.cartItems.filter(i=> i.id !== id);
        }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    incrementQty(state, action) {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },

    decrementQty(state, action) {
      const item = state.cartItems.find((i) => i.id === action.payload);
      console.log("item", item)
      if (item && item.quantity > 0) {
      
       item.quantity -= 1;
      }else {
        state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    

    clearCart(state) {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },

    setCart(state, action) {
      state.cartItems = action.payload;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
  
  // extraReducers: (builder) => {
  //   builder.addCase(loadCartFromFirebase.fulfilled, (state, action) => {
  //     state.cartItems = action.payload;
  //     localStorage.setItem('cartItems', JSON.stringify(action.payload));
  //   });
  // },
});


export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;






