import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: [] },
  reducers: {
    toggleWishlist: (state, action) => {
      const id = action.payload;
      const exists = state.items.find(i => i.id === id);
      if (exists) state.items = state.items.filter(i => i.id !== id);
      else state.items.push({ id });
    }
  }
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
