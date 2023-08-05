"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locale: 'en-US',
};

export const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale: (state, action) => {
        state.locale = action.payload;
    },
    setLocaleToEn: (state) => {
        state.locale = 'en-US';
    },
    setLocaleToJp: (state) => {
        state.locale = 'ja-JP';
    },    
  },
});

export const { setLocale, setLocaleToEn, setLocaleToJp } = localeSlice.actions

export default localeSlice.reducer;