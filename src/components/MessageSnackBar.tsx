
import React, { useState } from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../globalRedux/store';
import { setMessageSnackBarState } from '@/globalRedux/features/snackbar/messageSnackBarSlice';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
                onClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    } else {
                        dispatch(setMessageSnackBarState({ open: false, message: '' }));
                    }
                }}
                message={messageInput}
                key={'top' + 'center'}
                action={
                    <React.Fragment>
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        sx={{ p: 0.5 }}
                        onClick={() => dispatch(setMessageSnackBarState({ open: false, message: '' }))}
                      >
                        <CloseIcon />
                      </IconButton>
                    </React.Fragment>
                }
            />
        </>
    );
}

export default MessageSnackBar;