"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locale: 'en-US',
};

export const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    changeLocale: (state, action) => {
        state.locale = action.payload;
    },
  },
});

export const { changeLocale } = localeSlice.actions

export default localeSlice.reducer;