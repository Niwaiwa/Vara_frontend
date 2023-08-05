"use client";

import { createSlice } from "@reduxjs/toolkit";


const enum Locale {
  EN = 'en-US',
  JP = 'ja-JP',
}

const initialState = {
  locale: Locale.EN,
};

export const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale: (state, action) => {
        state.locale = action.payload;
    },
    setLocaleToEn: (state) => {
        state.locale = Locale.EN;
    },
    setLocaleToJp: (state) => {
        state.locale = Locale.JP;
    },    
  },
});

export const getAllLocales = () => {
  return [Locale.EN, Locale.JP];
}

export const { setLocale, setLocaleToEn, setLocaleToJp } = localeSlice.actions

export default localeSlice.reducer;