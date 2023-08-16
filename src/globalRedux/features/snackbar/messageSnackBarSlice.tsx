"use client";

import { createSlice, current } from "@reduxjs/toolkit";


interface Message {
    message: string;
    key: number;
}
interface MessageSnackBarState {
    open: boolean;
    snackPack: readonly Message[];
    messageInfo?: Message;
}

const initialState: MessageSnackBarState = {
    open: false,
    snackPack: [],
    messageInfo: undefined,
};

export const messageSnackBarSlice = createSlice({
    name: "messageSnackBar",
    initialState,
    reducers: {
        setMessageSnackBarState(state, action) {
            if (!state.snackPack) {
                state.snackPack = [];
            }
            const { message } = action.payload;
            const messageInfo = { message, key: new Date().getTime() };
            state.snackPack.push(messageInfo);
        },
        setMessageInfo: (state, action) => {
            const newMessageInfo = action.payload;
            state.messageInfo = newMessageInfo;
        },
        setSnackPack: (state, action) => {
            const newSnackPack = action.payload;
            state.snackPack = newSnackPack;
        },
        setOpen: (state, action) => {
            const newOpen = action.payload;
            state.open = newOpen;
        },
    },
});

export const { setMessageSnackBarState, setMessageInfo, setSnackPack, setOpen } = messageSnackBarSlice.actions

export default messageSnackBarSlice.reducer;