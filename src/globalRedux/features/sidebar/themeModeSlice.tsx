"use client";

import { createSlice } from "@reduxjs/toolkit";

const enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
}

const initialState = {
  themeMode: ThemeMode.Light,
};

export const themeModeSlice = createSlice({
  name: "themeMode",
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
        state.themeMode = action.payload;
    },
    setThemeModeToLight: (state) => {
        state.themeMode = ThemeMode.Light;
    },
    setThemeModeToDark: (state) => {
        state.themeMode = ThemeMode.Dark;
    },
  },
});

export const getAllThemeModes = () => {
    return [ThemeMode.Light, ThemeMode.Dark];
}

export const { setThemeMode, setThemeModeToLight, setThemeModeToDark } = themeModeSlice.actions

export default themeModeSlice.reducer;