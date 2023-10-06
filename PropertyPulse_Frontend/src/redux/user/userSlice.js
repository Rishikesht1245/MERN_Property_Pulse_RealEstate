import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  sliceError: "",
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
    deleteUserStart: (state) => {
      state.loading = true;
      state.sliceError = "";
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.sliceError = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.sliceError = action.payload;
    },
    signOutStart: (state) => {
      state.loading = true;
      state.sliceError = "";
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.sliceError = null;
    },
    signOutFailure: (state, action) => {
      state.loading = false;
      state.sliceError = action.payload;
    },
    showListingStart: (state) => {
      state.loading = true;
      state.sliceError = "";
    },
    showListingSuccess: (state) => {
      state.loading = false;
      state.sliceError = null;
    },
    showListingFailure: (state, action) => {
      state.loading = false;
      state.sliceError = action.payload;
    },
  },
});

export const {
  singInSuccess,
  signOut,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
