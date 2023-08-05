"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: 'light',
};

export const themeModeSlice = createSlice({
  name: "themeMode",
  initialState,
  reducers: {
    changeThemeMode: (state, action) => {
        state.themeMode = action.payload;
    },
  },
});

export const { changeThemeMode } = themeModeSlice.actions

export default themeModeSlice.reducer;