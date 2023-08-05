"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rating: 'all',
};

export const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    changeRating: (state, action) => {
        state.rating = action.payload;
    },
  },
});

export const { changeRating } = ratingSlice.actions

export default ratingSlice.reducer;