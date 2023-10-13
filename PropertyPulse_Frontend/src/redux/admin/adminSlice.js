import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentAdmin = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signInSuccess, signOut } = adminSlice.actions;
export default adminSlice.reducer;
