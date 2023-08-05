"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  userInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
        state.userInfo = action.payload;
    },
    setIsLogin: (state) => {
        state.isLogin = !state.isLogin;
    },
  },
});

export const { setUserInfo, setIsLogin } = authSlice.actions

export default authSlice.reducer;