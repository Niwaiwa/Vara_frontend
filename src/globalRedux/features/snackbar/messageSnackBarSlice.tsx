"use client";

import { createSlice } from "@reduxjs/toolkit";


interface MessageSnackBarState {
    open: boolean;
    message: string;
}

const initialState: MessageSnackBarState = {
    open: false,
    message: "",
};

export const messageSnackBarSlice = createSlice({
    name: "messageSnackBar",
    initialState,
    reducers: {
        setMessageSnackBarState: (state, action) => {
            state.open = action.payload.open;
            state.message = action.payload.message;
        },
    },
});

export const { setMessageSnackBarState } = messageSnackBarSlice.actions

export default messageSnackBarSlice.reducer;