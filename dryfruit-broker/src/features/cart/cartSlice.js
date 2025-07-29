import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveCartToFirestore, loadCartFromFirestore } from "../../app/cartApi";


export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (uid) => {
    return await loadCartFromFirestore(uid);
  }
);


 export const syncCart = createAsyncThunk(
  "cart/syncCart",
  async ({ uid, cartItems }) => {
    await saveCartToFirestore(uid, cartItems);
    return cartItems;
  }
);

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i.id === item.id);
      if (existItem) {
        existItem.quantity = item.quantity || existItem.quantity;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          state.cartItems = state.cartItems.filter((i) => i.id !== id);
        }
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    incrementQty(state, action) {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQty(state, action) {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
        }
      }
    },
    clearCart(state) {
      state.cartItems = [];
    },
    setCart(state, action) {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to load cart";
      })
      .addCase(syncCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      });
  },
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






