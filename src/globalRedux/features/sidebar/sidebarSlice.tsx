"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: true,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    switchOpen: (state) => {
        state.open = !state.open;
    },
  },
});

export const { switchOpen } = sidebarSlice.actions

export default sidebarSlice.reducer;