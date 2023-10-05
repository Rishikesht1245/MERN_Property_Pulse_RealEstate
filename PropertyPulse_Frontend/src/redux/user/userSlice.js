import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    singInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { singInSuccess, signOut, updateUserSuccess } = userSlice.actions;

export default userSlice.reducer;
