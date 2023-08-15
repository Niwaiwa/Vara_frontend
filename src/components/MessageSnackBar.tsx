
import React, { useState } from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../globalRedux/store';
import { setMessageSnackBarState } from '@/globalRedux/features/snackbar/messageSnackBarSlice';

const MessageSnackBar: React.FC = () => {

    const openInput = useSelector((state: RootState) => state.messageSnackBar.open);
    const messageInput = useSelector((state: RootState) => state.messageSnackBar.message);
    const dispatch = useDispatch();

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
                open={openInput}
                onClose={() => dispatch(setMessageSnackBarState({ open: false, message: '' }))}
                message={messageInput}
                key={'top' + 'center'}
            />
        </>
    );
}

export default MessageSnackBar;