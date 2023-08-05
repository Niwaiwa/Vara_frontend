"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: 'light',
};

export const themeModeSlice = createSlice({
  name: "themeMode",
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
        state.themeMode = action.payload;
    },
    setThemeModeToLight: (state) => {
        state.themeMode = 'light';
    },
    setThemeModeToDark: (state) => {
        state.themeMode = 'dark';
    },
  },
});

export const { setThemeMode, setThemeModeToLight, setThemeModeToDark } = themeModeSlice.actions

export default themeModeSlice.reducer;