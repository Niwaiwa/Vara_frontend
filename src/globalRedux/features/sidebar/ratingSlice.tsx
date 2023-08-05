"use client";

import { createSlice } from "@reduxjs/toolkit";

const enum Rating {
    All = 'all',
    G = 'G',
    E = 'E',
}

const initialState = {
  rating: Rating.All,
};

export const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    setRating: (state, action) => {
        state.rating = action.payload;
    },
    setRatingToAll: (state) => {
        state.rating = Rating.All;
    },
    setRatingToG: (state) => {
        state.rating = Rating.G;
    },
    setRatingToE: (state) => {
        state.rating = Rating.E;
    }
  },
});

export const getAllRatings = () => {
    return [Rating.All, Rating.G, Rating.E];
}

export const { setRating, setRatingToAll, setRatingToG, setRatingToE } = ratingSlice.actions

export default ratingSlice.reducer;