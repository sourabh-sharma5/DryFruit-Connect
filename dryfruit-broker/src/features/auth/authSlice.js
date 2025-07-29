
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      const { user, role } = action.payload;
      state.user = user;
      state.role = role;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.role = null;
    },
    logout(state) {
      state.user = null;
      state.role = null;
    },
  },
});

export const { setUser, setRole, clearUser, logout } = authSlice.actions;
export default authSlice.reducer;
