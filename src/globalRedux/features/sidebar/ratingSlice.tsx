"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rating: 'all',
};

export const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    setRating: (state, action) => {
        state.rating = action.payload;
    },
    setRatingToAll: (state) => {
        state.rating = 'all';
    },
    setRatingToG: (state) => {
        state.rating = 'G';
    },
    setRatingToE: (state) => {
        state.rating = 'E';
    }
  },
});

export const { setRating, setRatingToAll, setRatingToG, setRatingToE } = ratingSlice.actions

export default ratingSlice.reducer;