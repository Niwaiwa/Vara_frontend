"use client";

import { createSlice } from "@reduxjs/toolkit";

interface User {
  email: string;
  password: string;
}

interface AuthState {
  isLoggedIn: boolean;
  userInfo: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
        state.userInfo = action.payload;
    },
    setisLoggedIn: (state) => {
        state.isLoggedIn = !state.isLoggedIn;
    },
    login: (state, action) => {
        state.isLoggedIn = true;
        state.userInfo = action.payload;
    },
    logout: (state) => {
        state.isLoggedIn = false;
        state.userInfo = null;
    },
  },
});

export const { setUserInfo, setisLoggedIn, login, logout } = authSlice.actions

export default authSlice.reducer;