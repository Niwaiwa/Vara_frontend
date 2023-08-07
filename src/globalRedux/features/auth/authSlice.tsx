"use client";

import { createSlice } from "@reduxjs/toolkit";

interface User {
    id: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    last_login: string;
    email: string;
    username: string;
    nickname: string;
    avatar: string;
    header: string;
    description: string;
    locale: string;
}

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    userInfo: User | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
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
            state.token = action.payload;
            state.userInfo = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
            state.userInfo = null;
        },
    },
});

export const { setUserInfo, setisLoggedIn, login, logout } = authSlice.actions

export default authSlice.reducer;